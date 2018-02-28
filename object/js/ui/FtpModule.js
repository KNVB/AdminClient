class FtpModule extends ModuleTemplate
{
	constructor(adminPageControl)
	{
		super(adminPageControl);		
		this.heading="FTP Server Administration";
		
		var functionItem={"title":"List Server",
						  "action":this.listServer.bind(this)};
		this.functionList.push(functionItem);
		
		var functionItem={"title":"Add Server <i class=\"w3-padding fa fa-pencil\"></i>",
						  "action":this.addServer.bind(this)};
		this.functionList.push(functionItem);
		
		var functionItem={"title":"Remove Server <i class=\"w3-padding fa fa-pencil\"></i>",
						  "action":this.removeServer.bind(this)};
		this.functionList.push(functionItem);
	}
	listServer()
	{
		this.adminPageControl.setMainContent(new Array(this.heading+" > list server"));
	}
	addServer()
	{
		//this.setMainContent(new Array(this.heading+" > add server"));
		var self=this;
		/*var userInfo=new UserInfo();
		userInfo.userName="anonymous";
		userInfo.password="password";
		userInfo.enabled=true;*/
		
//		var ftpServerInfo=new FtpServerInfo();
		this.ftpServerInfoPage=new FtpServerInfoPage(this.adminPageControl);
	/*	ftpServerInfo.userInfoList[userInfo.userId]=userInfo;
		userInfo=new UserInfo();
		userInfo.userId="sddssdfds";
		userInfo.userName="陳大文";
		userInfo.password="密碼";
		userInfo.enabled=false;
		var accessRight=new AccessRight(Utility.getUniqueId());
		accessRight.physicalDir="C:\\";
		userInfo.accessRightList[accessRight.id]=accessRight;
		ftpServerInfo.userInfoList[userInfo.userId]=userInfo;*/
		
		this.adminPageControl.setMainContent(this.ftpServerInfoPage.getDomObjList());
		this.adminPageControl.adminServer.getInitialFtpServerInfo();
		this.adminPageControl.adminServer.getServerResponse().then(function(serverResponseObj)
		{
			//console.log(serverResponseObj.returnObjects);
			self.ftpServerInfoPage.loadData(serverResponseObj.returnObjects.ftpServerInfo);
		});
		
		
	}
	removeServer()
	{
		this.adminPageControl.setMainContent(new Array(this.heading+" > remove server"));
	}
}