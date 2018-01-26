class FtpModule
{
	constructor(headingHandler)
	{
		this.headingHandler=headingHandler;
		this.heading="FTP Server Administration";
		this.functionList={"functionList":[{"title":"List Server","action":this.listServer.bind(this)}]};
		
	}
	listServer()
	{
		console.log("list server");
	};
	getDomObj()
	{
		var self=this;
		var a=document.createElement("a");
		var i=document.createElement("i");
		a.href="#";
		a.text=this.heading;
		a.onclick=function()
				{
					self.headingHandler();
				}
		a.className="w3-bar-item w3-button functionListItem";
		i.className="fa fa-caret-down w3-margin-left";
		a.appendChild(i);
		return a;	
	}
}