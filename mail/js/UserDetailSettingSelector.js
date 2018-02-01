class UserDetailSettingSelector
{
	constructor(userInfo,adminPageControl)
	{
		this.domObjList=new Array();
		this.userInfo=userInfo;
		this.userDetailSettingArray=new Array();
		this.userDetailSettingSelectorDiv=document.createElement("div");
		this.userDetailSettingSelectorDiv.className="w3-bar w3-light-grey";
		this.userDetailSettingSelectorDiv.id="userDetailSettingSelector"+userInfo.userId;
		this.userDetailSettingSelectorContainerDiv=document.createElement("div");
		this.userDetailSettingSelectorContainerDiv.appendChild(this.userDetailSettingSelectorDiv);
		this.addSetting(new UserAccessRightSetting(userInfo,adminPageControl));
		this.addSetting(new UserQutoaSetting(userInfo,adminPageControl));
	}
	addSetting(setting)
	{
		this.userDetailSettingArray.push(setting);
	}
	getDomObj()
	{
		var self=this;
		for (var i=0;i<this.userDetailSettingArray.length;i++)
		{
			let name=this.userDetailSettingArray[i].name+this.userInfo.userId;
			var button1=document.createElement("BUTTON");
			
			button1.className="w3-bar-item w3-button tablink";
			button1.onclick=function()
							{
								self.switchDetailSetting(event,name);
							}
			
			var text1=document.createTextNode(this.userDetailSettingArray[i].name);
			button1.appendChild(text1);
			this.userDetailSettingSelectorDiv.appendChild(button1);
			var setting=this.userDetailSettingArray[i].getDomObj();
			this.userDetailSettingSelectorContainerDiv.appendChild(setting);
			if (i==0)
			{	
				$(setting).show();
				button1.className+=" w3-red";
			}
			else
				$(setting).hide();	

		}
		return this.userDetailSettingSelectorContainerDiv;
	}
	switchDetailSetting(event,settingName)
	{
		var i, x, tablinks;
		x = document.getElementsByClassName("detail-setting");
		for (i = 0; i < x.length; i++) 
		{
		  x[i].style.display = "none";
		}
		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < x.length; i++) {
		  tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
		}
		document.getElementById(settingName).style.display = "block";
		event.currentTarget.className += " w3-red";
	}
}