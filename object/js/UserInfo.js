class UserInfo
{
	constructor()
	{
		var accessRightId=Utility.getUniqueId();
		this.userName="";
		this.password="";
		this.userId="0";
		this.enabled=false;
		this.accessRightList=new Array();
		this.accessRightList[accessRightId]=new AccessRight(accessRightId);
		this.quotaList=[];
	}
}