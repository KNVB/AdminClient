class UserQutoaSetting
{
	constructor(userEntryId,adminPageControl)
	{
		this.name="Quota Setting";
		this.userEntryId=userEntryId;
	}
	getDomObj()
	{
		var div=document.createElement("div");
		div.innerHTML="<br>"+this.name;
		div.className="w3-animate-left detail-setting";
		div.id=this.name+this.userEntryId;
		return div;
	}
}