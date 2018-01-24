class ModalList
{
	constructor()
	{
		var self=this;
		this.moduleListDiv=document.createElement("div");
		this.moduleListDiv.id="moduleListDiv";
	}
	collapse()
	{
		$(this.moduleListDiv).children("div").each(function ()
									{
										$(this).children("a").removeClass("w3-red");	
										$(this).children("div").addClass("w3-hide");
									});
	}
	addModalUI(modalUI)
	{
		var self=this;
		$(modalUI).children("a.w3-bar-item.w3-button").on("click",function()
																 {
																	 self.updateSideNavigation(this);
																 });
		this.moduleListDiv.appendChild(modalUI);
	}
	updateSideNavigation(obj)
	{
		$(this.moduleListDiv).children("div").each(function ()
									{
										$(this).children("a").removeClass("w3-red");	
										$(this).children("div").addClass("w3-hide");
									});
		$(obj).addClass("w3-red");
		$(obj).next("div").removeClass("w3-hide");
	}
	getHTML()
	{
		return this.moduleListDiv;
	}
}	