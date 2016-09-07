/* This class contains all the definition of the robot */
/* it uses and setup the spriteSheet for the robot */
/* it defines methods for movement and fire */
/* it defines properties for life, steps, recoil, etc. */

var Robot = function()
{
 this.spriteSheet = null;
 this.lives = 5;
 this.directions = { down:0, left:1, right:2, up:3};
 this.direction = this.directions.down; //used for fireballs

 this.fireball1;
};

Robot.prototype.setup = function(x,y, context)
{
	this.spriteSheet = new SpriteSheet(x, y, 1577, 332, 19, 4, "./img/sprites/robot_spritesheet_dlru.png", context);	
    this.spriteSheet.speed = 2;
	this.spriteSheet.setup("spriteSheet", "Robot");
    
}

//redefinition of method shift in SpriteSheet.
Robot.prototype.shift = function(sx, sy)
{
 //here we manage the rotation of the robot
 //in base to the shiftment: dlru
 
 if(sx > 0)//right
 {this.spriteSheet.indexY = 2; this.direction = this.directions.right;}
 else if(sx < 0) //left
 {this.spriteSheet.indexY = 1; this.direction = this.directions.left;}
 else if(sy > 0) //down
 {this.spriteSheet.indexY = 0; this.direction = this.directions.down;}
 else if(sy < 0) //up
 {this.spriteSheet.indexY = 3; this.direction = this.directions.up;}	
	
 this.spriteSheet.shift(sx, sy);
 this.spriteSheet.ticX(); 
}

//---------------------------------------------------
//Redefinition of method draw of SpriteSheet to simplify the calling
Robot.prototype.draw = function()
{
 this.spriteSheet.draw(this.spriteSheet.indexX, this.spriteSheet.indexY);	

 //here we verify if we have to draw the fireball1:
 if(this.fireball1 != null) //active
 {
  this.fireball1.draw();	 
 }
 
}

//------------------------------------------------------
//Triggers a fireball
Robot.prototype.fire = function()
{
 //we need to enable the new object:	
 console.log("Robot triggering to: "+this.direction);	
 //here we are just going to active the fireball:
 this.fireball1 = new Fireball();
 //here we are going to setup the fireball:
 this.fireball1.setup(this.spriteSheet.x, this.spriteSheet.y, this.getFireballDirection(), this.spriteSheet.ctx );
}

//-------------------------------------------------------

Robot.prototype.getFireballDirection = function()
{
 switch(this.direction)
 {
  case this.directions.up: return 2;
  case this.directions.down: return 6;
  case this.directions.left: return 0;
  case this.directions.right: return 4; 	 
 }	
}