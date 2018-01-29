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
		var ftpModule_AddServer=new FtpModule_AddServer(this.adminPageControl);
		this.adminPageControl.setMainContent(ftpModule_AddServer.getDomObjList());
	}
	removeServer()
	{
		this.adminPageControl.setMainContent(new Array(this.heading+" > remove server"));
	}
}