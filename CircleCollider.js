/* This class is used to show and manipulate round areas*/
/* it is intended to detect collitions and when a sprite */
/* is in or out of a CircleCollider area */

var CircleCollider = function(x,y, radio)
{
 this.x = x; //the center of the CircleCollider
 this.y = y;
 this.radio = radio;
 this.isDrawable = false; //if we have to draw the area (for debugging reasons)
 this.basic = null;
 this.ctx;
 this.colorLine = "rgba(255, 0, 0, 0.5)";
 };

//------------------------------------------------------
CircleCollider.prototype.setup = function(theName, context)
{ 
 this.basic = new MyBasic("CircleCollider", theName);
 this.isDrawable = false;
 this.ctx = context;
}


//------------------------------------------------------
CircleCollider.prototype.getDistance = function(x1, y1)
{
 var theX = this.x - x1;
 var theY = this.y - y1;
 return Math.sqrt(theX*theX + theY*theY); 
};

//------------------------------------------------------
//look if a point is inside the CircleCollider
CircleCollider.prototype.isIn = function(x1, y1)
{
 var dist = this.getDistance(x1, y1); //distance between the point1 and the center.
 return (dist < this.radio);		
};

//---------------------------------------------------------
//checks if another CircleCollider instersects with this one
CircleCollider.prototype.isTouching = function(otherCollider)
{
	if(otherCollider.basic.myType == "CircleCollider")
	{
	   //the easiest way is to calculate the distance
	   //between the 2 centers, D = P1, P2
	   //if D is shorter than radio1 + radio2
	   //then, the other CircleCollider is touching this CircleCollider
	   var D = this.getDistance(otherCircleCollider.x, otherCircleCollider.y);
	   return (D <= (this.radio + otherCircleCollider.radio));
    }
	else if(otherCollider.basic.myType == "SquareCollider") //if the other collider is a square)
	{
		//the easiest part is check if any of edges of the square is in the circle:
     var r = (  this.isIn(otherCollider.x, otherCollider.y)
             || this.isIn(otherCollider.x + otherCollider.width, otherCollider.y)
             || this.isIn(otherCollider.x, otherCollider.y + otherCollider.height)
             || this.isIn(otherCollider.x + otherCollider.width, otherCollider.y + otherCollider.height));   			 
	
	 if (!r) //we still have to validate if there is a line through the circle
     {
	  //there are 2 vertical lines and 2 horizontal lines    
	  r = this.areVerticalIntersections(otherCollider.x, otherCollider.y, otherCollider.y + otherCollider.height)
	   || this.areVerticalIntersections(otherCollider.x + otherCollider.width, otherCollider.y, otherCollider.y + otherCollider.height)
	   || this.areHorizontalIntersections(otherCollider.y, otherCollider.x, otherCollider.x + otherCollider.width)
	   || this.areHorizontalIntersections(otherCollider.y + otherCollider.height, otherCollider.x, otherCollider.x + otherCollider.width);
	 }
      
	 return r;  	  
	}
	
	return false; //if no collition can be detected.
}

//--------------------------------------------------------
//If it is drawable, it will be draw:
CircleCollider.prototype.draw = function()
{
 if(!this.isDrawable){ return; }		
	
 this.ctx.beginPath();
 this.ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
 this.ctx.strokeStyle = this.colorLine;
 this.ctx.stroke();
 this.ctx.closePath();	
}

//---------------------------------------------------------
//method to shift the area:
CircleCollider.prototype.shift = function(sx, sy)
{
 this.x = this.x + sx;
 this.y = this.y + sy;	
}

//---------------------------------------------------------

CircleCollider.prototype.inBetween = function(a,b,c)
{
	return (a <= b && b <= c);
}

//---------------------------------------------------------\

CircleCollider.prototype.areRealIntersections = function(theX, centerX)
{
 var r2 = this.radio * this.radio;	
 var s1 = Math.pow(theX - centerX, 2);
 return (r2 >= s1);	
}

//-----------------------------------------------------------
//we asume orthogonal lines only
CircleCollider.prototype.areVerticalIntersections = function(Lx1, Ly1, Ly2)
{
 var r2 = this.radio * this.radio;
 var s1 = Math.pow(Lx1 - this.x, 2);
 
 if(this.inBetween(this.x-this.radio, Lx1, this.x+this.radio) 
    && this.areRealIntersections(Lx1, this.x))
 {
	 //we obtain the intersections:
	 var y1 = this.y + Math.sqrt(r2 - s1);
	 var y2 = this.y - Math.sqrt(r2 - s1);
	 
	return (this.inBetween(Ly1, y1, Ly2) || this.inBetween(Ly1, y2, Ly2));
 }
	
 return false; //in case no intersection is found	
}

//-------------------------------------------------------------------------------------

CircleCollider.prototype.areHorizontalIntersections = function(Ly1, Lx1, Lx2)
{
 var r2 = this.radio * this.radio;
 var s1 = Math.pow(Ly1 - this.y, 2);
 
 if(this.inBetween(this.y-this.radio, Ly1, this.y+this.radio)
  && this.areRealIntersections(Ly1, this.y))
 {
  //we get the intersections:
  var x1 = this.x + Math.sqrt(r2 - s1);
  var x2 = this.x - Math.sqrt(r2 - s1);
  
  return (this.inBetween(Lx1, x1, Lx2) || this.inBetween(Lx1, x2, Lx2));  
 }
 
 return false; //in case no intersection detected 
}