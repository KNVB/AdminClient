class AdminServerModule extends ModuleTemplate
{
	constructor(headingHandler,setMainContent)
	{
		super(headingHandler,setMainContent);
		this.heading="Administration Server Setting";
		var functionItem={"title":"Change Admin user and password","action":this.changePassword.bind(this)};
		this.functionList.push(functionItem);
	}
	changePassword()
	{
		this.setMainContent(new Array(this.heading+" > Change Admin user and password"));
	}
}