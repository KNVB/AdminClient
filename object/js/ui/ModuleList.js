class ModuleList
{
	constructor(closeSideBar)
	{
		this.moduleDiv;
		this.closeSideBar=closeSideBar;
		this.moduleList=new Array();
	}
	addModule(module)
	{
		this.moduleList.push(module);
	}
	getDomObj()
	{
		var self=this;
		this.moduleDiv=document.createElement("div");
		var text1=document.createTextNode("Close");
		var a1=document.createElement("A");
		var i1=document.createElement("I");
		a1.onclick=function()
							{	
								self.closeSideBar();
							}
		a1.title="Close Sidemenu";
		a1.className="w3-bar-item w3-button w3-hide-large w3-large";
		a1.appendChild(text1);
		i1.className="fa fa-remove";
		a1.appendChild(i1);
		
		this.moduleDiv.appendChild(a1);
		for (var i=0;i<this.moduleList.length;i++)
		{
			//console.log(this.moduleList[i].heading);
			var functionList=this.moduleList[i].getFunctionList();
			//console.log(functionList);
			for (var j=0;j<functionList.length;j++)
			{
				this.moduleDiv.appendChild(functionList[j]);
			}
		}						
		return this.moduleDiv;
	}
	hide()
	{
		var self=this;
		return new Promise(function(resolve, reject)
		{
			$(self.moduleDiv).hide("slide",{},500,resolve);
		});		
	}
	showHideFunctionList(modulesListItem)
	{
		//console.log(modulesListItem);
		var mli=modulesListItem;
		var parentDiv=$(modulesListItem).parent();
		$(parentDiv).children("div").each(function ()
										{
											if (this.className.indexOf("w3-show")>-1)
												this.className=this.className.replace("w3-show","w3-hide");
										});
		$(parentDiv).children(".moduleListItem").each(function()
									{
										if (this===mli)
										{
											if (this.className.indexOf("w3-red")==-1)
											{	
												this.className+=" w3-red";
												this.nextElementSibling.className=this.nextElementSibling.className.replace("w3-hide","w3-show");
											}
											else
											{
												this.className=this.className.replace(" w3-red","");
												this.nextElementSibling.className=this.nextElementSibling.className.replace("w3-show","w3-hide");
											}
										}
										else
										{
											this.className=this.className.replace(" w3-red",""); 
										}
									});							
	}
}