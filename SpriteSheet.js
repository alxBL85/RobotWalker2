/* This is an advanced version of the class Sprite
   it is designed to manage spritesheets from two dimensions */
   
var SpriteSheet = function(x,y, width, height, totalColumns, totalRows, spriteSheetSrc, context)
{
 this.myBasic = null;
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 this.totalRows = totalRows; //the number of sprites in vertical
 this.totalColumns = totalColumns; //the number of sprites in horizontal
 this.frameWidth = width/totalColumns;
 this.frameHeight = height/totalRows;
 this.indexX = 0;
 this.indexY = 0;
 this.sprite = new Sprite(x,y, width, height, spriteSheetSrc, context)
 this.ctx = context;
 this.speed = 1; //how fast it will be shifted.  
};

//----------------------------------------------------------

SpriteSheet.prototype.setup = function(myType, myName)
{
 this.sprite.setup(myType, myName);
 console.log("SpriteSheet.setup: frame size:" + this.frameWidth+"x"+this.frameHeight);
 
   
};

//-----------------------------------------------------------

SpriteSheet.prototype.draw = function(indX, indY)
{
	//console.log("drawing spritesheet:" + this.sprite.myBasic.myName);
    
    if((indX < 0 || indX >= this.totalColumns) || (indY < 0 || indY >= this.totalRows))
	{
	 console.log("Spriteshet drawing: Error indexes out of bounds: "+indX+","+indY);
	 return;		
	};
		
	var img = this.sprite.imgSprite;
		
	if(img.complete)
	{
	 /*console.log("    complete");
	 console.log(" ctx:"+typeof(this.ctx));
	 console.log(" frameWidth:" + this.frameWidth);
	 console.log(" frameHeight:" + this.frameHeight);
	 console.log(" x:" + this.sprite.x);
	 console.log(" y:" + this.sprite.y);
	 console.log(" indX:"+indX);
	 console.log(" indY:"+indY);
	 console.log(" s:" + this.sprite.scale);*/
	 
     this.ctx.drawImage(img,
	                    indX * this.frameWidth,
						indY * this.frameHeight,
						this.frameWidth,
						this.frameHeight,
						this.sprite.x,
						this.sprite.y,
						this.frameWidth * this.sprite.scale,
						this.frameHeight * this.sprite.scale
					    );		
	}
	else
	{
	 console.log("   not complete");
     var ctx1 = this.ctx;
     var fw = this.frameWidth;
     var fh = this.frameHeight;
     var x = this.sprite.x;
     var y = this.sprite.y;
	 var s = this.sprite.scale;
	 
	 /*console.log(" ctx1:"+typeof(ctx1));
	 console.log(" fw:" + fw);
	 console.log(" fh:" + fh);
	 console.log(" x:" + x);
	 console.log(" y:" + y);
	 console.log(" s:" + s);*/
   	 
     img.onload = function(){
		 ctx1.drawImage(this, //reference to the image
		                indX * fw,
						indY * fh,
						fw,
						fh,
						x,
						y,
						fw * s, //frame width for the scale
						fh * s //frame height for the scale
		                );
		 
	 } //end of onload function
 	}	
};

//------------------------------------
SpriteSheet.prototype.ticX = function()
{
 var ix = this.indexX;
 this.indexX = 	(this.indexX >= this.totalColumns-1)? 0: this.indexX +1;
 return ix;
}

SpriteSheet.prototype.ticY = function()
{
 var iy = this.indexY;
 this.indexY = (this.indexY >= this.totalRows -1)? 0: this.indexY +1;
 return iy;
}

//-------------------------------------
SpriteSheet.prototype.shift = function(sx, sy)
{
	this.sprite.shift(sx * this.speed, sy * this.speed);
    this.x = this.sprite.x; //this code simplifies to get the sprite position
	this.y = this.sprite.y; //instead to call to spriteSheet.sprite.x, use spriteSheet.x
}
