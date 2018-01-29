class AdminServerModule extends ModuleTemplate
{
	constructor(adminPageControl)
	{
		super(adminPageControl);
		this.heading="Administration Server Setting";
		var functionItem={"title":"Change Admin user and password<i class=\"w3-padding fa fa-pencil\"></i>",
		                  "action":this.changePassword.bind(this)};
		this.functionList.push(functionItem);
	}
	changePassword()
	{
		this.adminPageControl.setMainContent(new Array(this.heading+" > Change Admin user and password"));
	}
}