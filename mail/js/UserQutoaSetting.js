class UserQutoaSetting
{
	constructor(userInfo,adminPageControl)
	{
		this.name="Quota Setting";
		this.userInfo=userInfo;
	}
	getDomObj()
	{
		var div=document.createElement("div");
		div.innerHTML="<br>"+this.name;
		div.className="w3-animate-left detail-setting";
		div.id=this.name+this.userInfo.userId;
		return div;
	}
}