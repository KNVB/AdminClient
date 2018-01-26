class LogoutModule
{
	constructor(headingHandler)
	{
		this.heading="Logout";
		this.headingHandler=headingHandler;
	}
	getDomObj()
	{
		var self=this;
		var a=document.createElement("a");
		a.href="#";
		a.text=this.heading;
		a.onclick=function()
				{
					self.headingHandler();
				}
		a.className="w3-bar-item w3-button";
		return a;	
	}
}