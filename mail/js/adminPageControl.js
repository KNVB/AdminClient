class AdminPageControl
{
	constructor()
	{
		this.moduleList;
		this.navBar=document.getElementById("mySideBar");
	}
	initSideBar()
	{
		$(this.navBar).empty();
		this.loginSideBar=new LoginSideBar(this.login.bind(this));
		$(this.navBar).append(this.loginSideBar.getDomObj());
	}
	login()
	{
		this.navBar.className=this.navBar.className.replace("w3-red","w3-white");
		$(this.loginSideBar.getDomObj()).hide("slide",{},500,this.initAdminPage.bind(this));
	}
	initAdminPage()
	{
		$(this.navBar).empty();
		this.moduleList=new ModuleList();
		//this.moduleList.addModule(new FtpModule(this.showHideFunctionList.bind(this)));
		//this.moduleList.addModule(new LogoutModule(this.logout.bind(this)));
		$(this.navBar).empty();
		$(this.navBar).append(this.moduleList.getDomObj());
	}
	logout()
	{
		this.navBar.className=this.navBar.className.replace("w3-white","w3-red");
		console.log($(this.moduleList.getDomObj()));
		
		//$(this.moduleList.getDomObj()).hide("slide",{},50000,this.initSideBar());
		$(this.moduleList.getDomObj()).hide("slide",{},50000,function (){console.log("dsfds");});
	}
	showHideFunctionList()
	{
		
	}
}