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
CircleCollider.prototype.isTouching = function(otherCircleCollider)
{
	//the easiest way is to calculate the distance
	//between the 2 centers, D = P1, P2
	//if D is shorter than radio1 + radio2
	//then, the other CircleCollider is touching this CircleCollider
	
	var D = this.getDistance(otherCircleCollider.x, otherCircleCollider.y);
	
	return (D <= (this.radio + otherCircleCollider.radio));

	
}

//--------------------------------------------------------
//If it is drawable, it will be draw:
CircleCollider.prototype.draw = function()
{
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


