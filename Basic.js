
/* Basic is the most basic defined object for game developing 
   All the game objects will include a reference to a Basic object called basic.
   
   In the future, they will implement or heritage from Basic
*/

var MyBasic = function(myType, myName)
{
 this.myType = myType;
 this.status = 1; //1:active, 0:inactive
 this.myName = myName;	
};

