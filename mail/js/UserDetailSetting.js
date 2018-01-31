class UserDetailSetting
{
	constructor(thisUserData,adminPageControl)
	{
		console.log(thisUserData);
		var self=this;
		var cancelLink=document.createElement("a"); 
		var savelLink=document.createElement("a"); 
		var closeSpan=document.createElement("span");
		var titleSpan=document.createElement("span");
		var modalContentDiv=document.createElement("div");
		var containerDiv=document.createElement("div");
		var panelDiv=document.createElement("div");
		var sectionDiv=document.createElement("div");
		var userDetailSettingSelector=new UserDetailSettingSelector(thisUserData.userEntryId);
		
		this.adminPageControl=adminPageControl;
		this.userDetailSettingDiv=document.createElement("div");
		
		titleSpan.className="w3-red w3-left";
		$(titleSpan).html("<h3>User Detail Setting</h3>");
		
		closeSpan.className="w3-button w3-right";
		closeSpan.innerHTML="<i class=\"fa fa-remove\"></i>";
		closeSpan.setAttribute("style","font-size:15px;cursor:pointer;");
		closeSpan.onclick=function()
						 {
							self.close();
						 };
		
		containerDiv.className="w3-container w3-padding w3-red";
		containerDiv.appendChild(titleSpan);
		containerDiv.appendChild(closeSpan);
		
		
		cancelLink.className="w3-button w3-red";
		cancelLink.innerHTML="Cancel <i class=\"fa fa-remove\"></i>";
		cancelLink.onclick=function()
						 {
							self.close();
						 };
		
		savelLink.className="w3-button w3-light-grey w3-right";
		savelLink.innerHTML="Save <i class=\"fa fa-check\"></i>";
		
		
		sectionDiv.className="w3-section";
		sectionDiv.appendChild(cancelLink);
		sectionDiv.appendChild(savelLink);
		
		userDetailSettingSelector.addSetting(new UserAccessRightSetting(thisUserData,adminPageControl));
		userDetailSettingSelector.addSetting(new UserQutoaSetting(thisUserData,adminPageControl));
		
		panelDiv.className="w3-panel";
		panelDiv.appendChild(userDetailSettingSelector.getDomObj());
		/*
		panelDiv.appendChild(selectorDiv1);
		panelDiv.appendChild(accessRightDiv);
		panelDiv.appendChild(quotaDiv);
		*/
		
		panelDiv.appendChild(sectionDiv);
				
		modalContentDiv.className="w3-modal-content w3-animate-zoom";
		modalContentDiv.appendChild(containerDiv);
		modalContentDiv.appendChild(panelDiv);
		
		
		this.userDetailSettingDiv.id="userDetailSetting"+thisUserData.userEntryId;
		this.userDetailSettingDiv.className="w3-modal";
		this.userDetailSettingDiv.style.zIndex="4";
		this.userDetailSettingDiv.appendChild(modalContentDiv);
		this.userDetailSettingDiv.style.display='block';
		
		document.body.appendChild(this.userDetailSettingDiv);						 
	}
	
	close()
	{
		this.userDetailSettingDiv.style.display='none';
	}				
	show()
	{
		this.userDetailSettingDiv.style.display='block';
	}						 
}