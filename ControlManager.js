/* Definition of the class to read the input of the keyboard*/
var theCharacter;

var ControlManager = function()
{
 //this.character = null; //the character that is going to be controlled by the keyboard

}; //end of class

ControlManager.prototype.setup = function(character)
{
 console.log("ControlManager.setup: control "+typeof(character));
 theCharacter = character;
 
 //Event listeners for the "Key Up" and "Key Down" events
 //this listeners are executed automatically in a different thread than the main thread
 //when we pass them, we loose the reference to this., they don't know what object they belong
 document.addEventListener("keydown", this.keyDownHandler, false); //when the browser fires the keydown event, the function keyDownHandler is called to handle the event
 document.addEventListener("keyUp", this.keyUpHandler, false);

};

//--------------------------------------------

ControlManager.prototype.keyDownHandler = function(e)
{
	console.log("key down:"+e.keyCode);
	if(e.keyCode == 39) //right keyCode
	{
		theCharacter.shift(1,0);
	}
	else if(e.keyCode == 37)//left keyCode
	{
		theCharacter.shift(-1,0);		
	}
	else if(e.keyCode == 40)//up keyCode
	{
		theCharacter.shift(0,1);		
	}
	else if(e.keyCode == 38)//down keyCode
	{
		theCharacter.shift(0,-1);
	}
    else if(e.keyCode == 32)//space bar
    {
		theCharacter.fire(); //throws a fireball		
	}	
}

//---------------------------------------------

ControlManager.prototype.keyUpHandler = function(e)
{
	console.log("key up:"+e.keyCode);	
}