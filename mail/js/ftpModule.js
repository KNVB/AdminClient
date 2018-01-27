class FtpModule
{
	constructor(headingHandler,setMainContent)
	{
		this.setMainContent=setMainContent;
		this.domObjList=new Array();
		
		this.headingHandler=headingHandler;
		this.heading="FTP Server Administration";
		
		this.functionList=new Array();
		
		var functionItem={"title":"List Server","action":this.listServer.bind(this)};
		this.functionList.push(functionItem);
		
	  var functionItem={"title":"Add Server","action":this.addServer.bind(this)};
		this.functionList.push(functionItem);
		
		var functionItem={"title":"Remove Server","action":this.removeServer.bind(this)};
		this.functionList.push(functionItem);
	}
	listServer()
	{
		this.setMainContent(this.heading+" > list server");
	}
	addServer()
	{
		this.setMainContent(this.heading+" > add server");
	}
	removeServer()
	{
		this.setMainContent(this.heading+" > remove server");
	}
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
				var a=document.createElement("A");
				var div=document.createElement("div");
				var span=document.createElement("span");
				let action=self.functionList[i].action;
				a.className="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey";
				a.onclick=function()
									{
										action();
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