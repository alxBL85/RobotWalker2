/* This class models the squared colliders */
/* It looks to detect collitions in squared areas */
/* or if an sprite is in or out the area */

var SquareCollider = function(x,y, width, height)
{
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 this.basic = null;
 this.isDrawable = false;
 this.ctx;
 this.colorLine = "rgba(255,0,0,0.5)";
};

//--------------------------------------------------
SquareCollider.prototype.setup = function(theName, context)
{
	this.basic = new MyBasic("SquareCollider", theName);
	this.isDrawable = false;
	this.ctx = context;	
}

//---------------------------------------------------
SquareCollider.prototype.isIn = function(x,y) //for a single x,y point
{
 return ((this.x < x && x< this.x +this.width) && (this.y <y && y<this.y+this.height));
}

//----------------------------------------------------
SquareCollider.prototype.isTouching = function(otherCollider)
{
	if(otherCollider.basic.myType == "SquareCollider") //if the other collider is too a square
	{
	 return (this.isIn(otherCollider.x, otherCollider.y) //top left corner
	      || this.isIn(otherCollider.x + otherCollider.width, otherCollider.y) //top
          || this.isIn(otherCollider.x, otherCollider.y + otherCollider.height)
          || this.isIn(otherCollider.x + otherCollider.width, otherCollider.y + otherCollider.height));  		  
	}
	else if(otherCollider.basic.myType == "CircleCollider")
	{
	 //the easiest part is check if any of edges of the square is in the circle:
     return (  otherCollider.isIn(this.x, this.y)
             || otherCollider.isIn(this.x + this.width, this.y)
             || otherCollider.isIn(this.x, this.y + this.height)
             || otherCollider.isIn(this.x + this.width, this.y + this.height));   			 
	
     
	}
	
}

//-------------------------------------------------------
SquareCollider.prototype.draw = function()
{
 this.ctx.beginPath();
 this.ctx.rect(this.x, this.y, this.width, this.height);
 this.ctx.strokeStyle = this.colorLine;
 this.ctx.stroke();
 this.ctx.closePath();	
}


//--------------------------------------------------------
SquareCollider.prototype.shift = function(sx, sy)
{
 this.x = this.x + sx;	 
 this.y = this.y + sy;	
}
