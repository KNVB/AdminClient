class Dialog
{
	constructor(msg)
	{
		this.title="";
		this.modal=true;
		this.resizable=false;
		this.contentDiv=document.createElement("div");
		this.contentDiv.innerHTML=msg;
		this.showCloseButton=true;
		this.buttons=[];
		this.titleBarColor="";
		this.titleBarBackgroundColor="";
		this.closeOnEscape=false;
		this.height="auto";
		this.width="auto";
	}
	
	show()
	{
		var self=this;
		$(this.contentDiv).dialog({ "buttons":this.buttons,
									"height":this.height,
									"width": this.width,
									"closeOnEscape":this.closeOnEscape,
									"modal":this.modal,
									"title":this.title,
									"resizable":this.resizable,
									open: function(event, ui) 
												{
													if (!self.showCloseButton)
														$(this).parent().find(".ui-dialog-titlebar-close").css("display","none");
													if (self.titleBarColor!="")
														$(this).parent().find(".ui-dialog-titlebar").css("color",self.titleBarColor);
													if (self.titleBarBackgroundColor!="")
														$(this).parent().find(".ui-dialog-titlebar").css("background-color",self.titleBarBackgroundColor);
													
													/*$(this).parent().find(".ui-dialog-buttonpane button").css("background-color","red");
													$(this).parent().find(".ui-dialog-buttonpane button").css("color","white");*/
													$(this).parent().find(".ui-widget-content").css("border","none");
												}
								});
	}
}