class UserInfo
{
	constructor()
	{
		this.userName="";
		this.password="";
		this.userId="0";
		this.enabled=false;
		this.accessRightList=new Array();
		this.accessRightList.push(new AccessRight(Utility.getUniqueId()));
		this.quotaList=[];
	}
}