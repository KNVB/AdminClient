class AdminPageControl
{
	constructor()
	{
		var self=this;
		var mainStageContainer;
		var hamBurgerI,overlayDiv;

		this.mainStage;
		this.moduleList;
		this.loginSideBar;
		
		this.navBar=document.createElement("nav");
		this.navBar.className="w3-sidebar w3-bar-block w3-collapse w3-red w3-animate-left w3-card"; 
		this.navBar.style="z-index:3;width:320px;";
		this.navBar.id="mySideBar";
		
		overlayDiv=document.createElement("div");
		overlayDiv.className="w3-overlay w3-hide-large w3-animate-opacity" 
		overlayDiv.style="cursor:pointer";
		overlayDiv.title="Close Sidemenu"; 
		overlayDiv.id="myOverlay";
		overlayDiv.onclick=function()
												{
													self.w3_close();
												}			
												
		hamBurgerI=document.createElement("i");
		hamBurgerI.className="fa fa-bars w3-button w3-white w3-hide-large w3-xlarge w3-margin-left w3-margin-top";
		hamBurgerI.onclick=function()
											{
												self.w3_open();
											}
		this.mainStage=document.createElement("div");
		this.mainStage.style.marginLeft="5px";
		mainStageContainer=document.createElement("div");
		mainStageContainer.className="w3-main";
		mainStageContainer.style.marginLeft="320px";
		mainStageContainer.appendChild(hamBurgerI);
		mainStageContainer.appendChild(this.mainStage);
		
		document.body.appendChild(this.navBar);
		document.body.appendChild(overlayDiv);
		document.body.appendChild(mainStageContainer);
	}
	
	initSideBar()
	{
		this.navBar.className=this.navBar.className.replace("w3-white","w3-red");
		$(this.navBar).empty();
		this.loginSideBar=new LoginSideBar(this.login.bind(this));
		$(this.navBar).append(this.loginSideBar.getDomObj());
	}
	login()
	{
		var self=this;
		this.navBar.className=this.navBar.className.replace("w3-red","w3-white");
		this.loginSideBar.hide().then(function()
																	{
																		self.initAdminPage();
																	});
	}
	initAdminPage()
	{
		$(this.navBar).empty();
		this.moduleList=new ModuleList(this.w3_close.bind(this));
		this.moduleList.addModule(new FtpModule(this.moduleList.showHideFunctionList.bind(this.moduleList),this.setMainStageContent.bind(this)));
		this.moduleList.addModule(new AdminServerModule(this.moduleList.showHideFunctionList.bind(this.moduleList),this.setMainStageContent.bind(this)));
		this.moduleList.addModule(new LogoutModule(this.logout.bind(this)));
		$(this.navBar).append(this.moduleList.getDomObj());
	}
	setMainStageContent(content)
	{
		$(this.mainStage).empty();
		for (var i=0;i<content.length;i++)
		{
			$(this.mainStage).append(content);
		}
		this.w3_close();
	}
	logout()
	{
		var self=this;
		this.setMainStageContent("");
		this.moduleList.hide().then(function()
																{
																	self.initSideBar();
																});
		this.w3_close();														
	}
	w3_open() 
	{    
		document.getElementById("mySideBar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
	}
	w3_close() 
	{
    document.getElementById("mySideBar").style.display = "none";
		document.getElementById("myOverlay").style.display = "none";
	}
}