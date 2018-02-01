class UserInfo
{
	constructor()
	{
		this.userName="";
		this.password="";
		this.userId="0";	
		this.accessRightList=new Array();
		this.accessRightList.push(new AccessRight(0));
		this.quotaList=[];
	}
}