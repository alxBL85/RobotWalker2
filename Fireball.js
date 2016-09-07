/* This class englobes the spritesheet of the fireball*/
var Fireball = function()
{
 this.spriteSheet = null;
 this.lives = 1;
 this.directions = {left:0, up:2, right:4, down:6};
 this.direction = this.directions.down;
};

Fireball.prototype.setup = function(x,y, direction, context)
{
 //we need to know the direction to shift the bullet.
 this.direction = direction;
 
 this.spriteSheet = new SpriteSheet(x,y, 512, 512, 8, 8, "./img/sprites/fireball_spritesheet.png", context);
 this.spriteSheet.setup("spriteSheet", "fireball");
 this.spriteSheet.speed = 4;
}

//-------------------------------------------------------------

Fireball.prototype.shift = function()
{
 //to move the fireball, we only need the direction and the speed
 //we need to convert them to x,y positions.
 var sx =0;
 var sy =0;
 
 if(this.direction == this.directions.left)
 { sx = -1;  }
 else if(this.direction == this.directions.right)
 { sx = 1;   }
 else if(this.direction ==  this.directions.up)
 { sy = -1;  }
 else if(this.direction == this.directions.down)
 { sy = 1;   }

 this.spriteSheet.shift(sx, sy);	 
}


//-------------------------------------------------------------
Fireball.prototype.draw = function()
{
 this.spriteSheet.draw(this.spriteSheet.indexX, this.direction)
 this.shift();
 this.spriteSheet.ticX();
 
	
}