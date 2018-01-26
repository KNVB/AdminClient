class FtpModule
{
	constructor(headingHandler)
	{
		this.domObjList=new Array();
		this.headingHandler=headingHandler;
		this.heading="FTP Server Administration";
		this.functionList=new Array({"title":"List Server","action":this.listServer.bind(this)});
		
	}
	listServer()
	{
		console.log("list server");
	};
	getFunctionList()
	{
		var self=this;
		var functionHeader=document.createElement("a");
		var i1=document.createElement("i");
		functionHeader.text=this.heading;
		functionHeader.onclick=function()
				{
					self.headingHandler(functionHeader);
				}
		functionHeader.className="w3-bar-item w3-button moduleListItem";
		i1.className="fa fa-caret-down w3-margin-left";
		functionHeader.appendChild(i1);
		this.domObjList.push(functionHeader);
		var functionListDiv=document.createElement("div");
		functionListDiv.className="w3-hide w3-animate-left";

		for (var i=0;i<this.functionList.length;i++)
		{
				console.log(i);
				var a=document.createElement("A");
				var div=document.createElement("div");
				var span=document.createElement("span");
				a.className="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey";
				a.onclick=function()
									{
										console.log(self.functionList.length,i);
									}
				div.className="w3-container";
				span.className="w3-opacity w3-large";
				span.appendChild(document.createTextNode(this.functionList[i].title));
				div.appendChild(span);
				a.appendChild(div);
				functionListDiv.appendChild(a);
		}
		this.domObjList.push(functionListDiv);
		
		return this.domObjList;	
	}
}