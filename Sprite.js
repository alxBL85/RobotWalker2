/*This is the basic class for every sprite used in the game
  it contains methods to define an sprite an draw it */

var Sprite = function(x,y,spriteFile, context)
{
 this.myBasic = null;
 this.x = x;
 this.y = y;
 this.scale = 1;
 this.width = 0; //this is taken from the image file size in the setup
 this.height = 0;
 this.spriteFile = spriteFile;
 this.imgSprite = new Image();
 this.context= context;
};

//---------------------------------------------------
Sprite.prototype.setup = function(myType, myName)
{
	this.myBasic = new MyBasic(myType, myName); //for example: collider, block, hero, fireball, enemy, etc.
	this.imgSprite.src = this.spriteFile;	
	this.ctx = context;	
	
	this.scale = 1;
	this.width = this.imgSprite.width;
	this.height = this.imgSprite.height;
};

//---------------------------------------------------
Sprite.prototype.draw = function()
{
 this.imgSprite.setAttribute("x", this.x);
 this.imgSprite.setAttribute("y", this.y);
 console.log("drawing: "+this.myBasic.myName);
  
 if(this.imgSprite.complete)
 { console.log("  complete");
   this.ctx.drawImage(this, //the spritesheet image
                   0, //sx, where the I-frame starts in X
				   0, //sy, where the I-frame starts in Y
                   this.width, //frame width
				   this.height, //frame height
				   x, //where in canva's X the sprite should be drawed
				   y, //where in canva's Y the sprite should be drawed
				   this.width*this.scale, //canvas destination width (ideal for scale)
				   this.height*this.scale //canvas destination height (ideal for scale)
				   );  
 }
 else
 { console.log("  not complete");	
   ctx = this.ctx;
   w = this.width;
   h = this.height;
   var scale = this.scale;
   //inside the function onload, the context of the function changes,
   //the function is defined inside the else and has no relationship
   //with the Class/object itself. That's why you can't reach the
   //components using the this.
   
   //There are 2 options: set a value as an atribute (.setAttribute) of the image
   //and in the onload, read the attibrute (this could be risky)
   
   //The other option is inside the else, define new vars with the values
   //that are going to be used in the onload, this values can do be reached
   //using the this. reference. Check ctx
   
   
   this.imgSprite.onload = function(){ //just remember that whenever you use onload you are creating another ambit                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
       	//inside onload, this. references to the imgSprite, not the object Sprite
		console.log(" width: "+this.width+", height:"+this.height);
		ctx.drawImage(this, //the spritesheet image
							 0, //sx, where the I-frame starts in X
							 0, //sy, where the I-frame starts in Y
                             this.width, //frame width
				             this.height, //frame height
				             this.getAttribute("x"), //where in canva's X the sprite should be drawed
				             this.getAttribute("y"), //where in canva's Y the sprite should be drawed
				             this.width * scale, //canvas destination width (ideal for scale)
				             this.height * scale//canvas destination height (ideal for scale)
				          );  
   };
 }//end of else
}

//----------------------------------------------------
//this shifts the Sprite a given amount of dx, and dy
Sprite.prototype.shift = function(dx, dy)
{
 this.x = this.x+dx;
 this.y = this.y+dy;	
 console.log(this.myBasic.myName+" shifted to: x,y: "+this.x+", "+this.y);
 
};

//----------------------------------------------------
Sprite.prototype.move = function(x, y)
{
 this.x = x;
 this.y = y;	
 console.log(this.myBasic.myName+" moved to: x,y: "+this.x+", "+this.y);
 
};