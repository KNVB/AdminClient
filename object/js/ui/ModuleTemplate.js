class ModuleTemplate
{
	constructor(adminPageControl)
	{
		this.domObjList=new Array();
		this.functionList=new Array();
		this.adminPageControl=adminPageControl;
	}
	getFunctionList()
	{
		var self=this;
		var functionHeader=document.createElement("a");
		var i1=document.createElement("i");
		functionHeader.text=this.heading;
		functionHeader.onclick=function()
				{
					self.adminPageControl.moduleList.showHideFunctionList.bind(this.moduleList)(functionHeader);
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
				span.innerHTML=this.functionList[i].title;
				div.appendChild(span);
				a.appendChild(div);
				functionListDiv.appendChild(a);
		}
		this.domObjList.push(functionListDiv);
		
		return this.domObjList;	
	}

	
}