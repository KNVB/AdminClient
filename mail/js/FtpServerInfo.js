class FtpServerInfo
{
	constructor()
	{
		this.description="";
		this.bindingAddress=new Array();
		this.controlPort=21;
		this.passiveModeEnabled=false;
		this.passiveModePortRange="";
		this.userInfoList=new Array();
		this.status=0;
	}
}