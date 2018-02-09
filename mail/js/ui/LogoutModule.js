class LogoutModule
{
	constructor(headingHandler)
	{
		this.domObjList=new Array();
		this.heading="Logout";
		this.headingHandler=headingHandler;
	}
	getFunctionList()
	{
		var self=this;
		var a=document.createElement("a");
		a.text=this.heading;
		a.onclick=function()
				{
					self.headingHandler();
				}
		a.className="w3-bar-item w3-button";
		this.domObjList.push(a);
		return this.domObjList;	
	}
}