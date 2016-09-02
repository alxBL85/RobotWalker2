/* This class contains all the definition of the robot */
/* it uses and setup the spriteSheet for the robot */
/* it defines methods for movement and fire */
/* it defines properties for life, steps, recoil, etc. */

var Robot = function()
{
 this.spriteSheet = null;
 this.lives = 5;
 this.speed = 1;
};

Robot.prototype.setup = function(x,y, context)
{
	this.spriteSheet = new SpriteSheet(x, y, 1577, 332, 19, 4, "./img/sprites/robot_spritesheet_dlru.png", context);	
    this.spriteSheet.setup("spriteSheet", "Robot");
}

//redefinition of method shift in SpriteSheet.
Robot.prototype.shift = function(sx, sy)
{
 //here we manage the rotation of the robot
 //in base to the shiftment: dlru
 
 if(sx > 0)//right
 {this.spriteSheet.indexY = 2; }
 else if(sx < 0) //left
 {this.spriteSheet.indexY = 1; }
 else if(sy > 0) //down
 {this.spriteSheet.indexY = 0; }
 else if(sy < 0) //up
 {this.spriteSheet.indexY = 3; }	
	
 this.spriteSheet.sprite.shift(sx*this.speed, sy*this.speed);
 this.spriteSheet.ticX(); 
}

//---------------------------------------------------
//Redefinition of method draw of SpriteSheet to simplify the calling
Robot.prototype.draw = function()
{
 this.spriteSheet.draw(this.spriteSheet.indexX, this.spriteSheet.indexY);	
	
}