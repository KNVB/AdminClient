class ModuleList
{
	constructor()
	{
		this.moduleDiv;
		this.moduleList=new Array();
	}
	addModule(module)
	{
		this.moduleList.push(module);
	}
	getDomObj()
	{
		this.moduleDiv=$(document.createElement("div"));
		this.moduleDiv.id="qq";
		for (var i=0;i<this.moduleList.length;i++)
		{
			this.moduleDiv.append(this.moduleList[i].getDomObj());
		}						
		return this.moduleDiv;
	}
}