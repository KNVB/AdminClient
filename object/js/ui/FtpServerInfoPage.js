class FtpServerInfoPage
{
	constructor(adminPageControl)
	{
		var self=this;
		var heading=document.createTextNode("FTP Server Administration > Add Server");		
		
		var p=document.createElement("p");
		var row=document.createElement("div");
		var cell=document.createElement("div");
		var cell2=document.createElement("div");
		var cell3=document.createElement("div");		

		var saveLink=document.createElement("a");
		
		var controlPortLegend=document.createElement("Legend");
		var passiveModeLegend=document.createElement("Legend");
		var networkSettingLegend=document.createElement("Legend");
		var bindingAddressLegend=document.createElement("Legend");
		
		var controlPortFieldSet=document.createElement("fieldset");
		var passiveModeFieldSet=document.createElement("fieldset");
		var bindingAddressFieldSet=document.createElement("fieldset");
		var networkSettingFieldSet=document.createElement("fieldset");

		var descriptionTextNode=document.createTextNode("Description:");

		this.descriptionInputBox=document.createElement("input");
		this.controlPortInputBox=document.createElement("input");
		this.passiveModeCheckBox=document.createElement("input");
		this.bindingAddressDropDown=document.createElement("select");
		this.passiveModePortRangeInputBox=document.createElement("input");

		$(networkSettingLegend).text("Network related setting");
		$(bindingAddressLegend).text("Binding Address");
		$(controlPortLegend).text("Port Listening");
		$(passiveModeLegend).text("Custom port range for passive mode:");
		
		this.descriptionInputBox.id="description";
		this.descriptionInputBox.setAttribute("type","text");	
		
		
		this.bindingAddressDropDown.id="bindingAddress";
		this.bindingAddressDropDown.multiple=true;

		this.controlPortInputBox.min=1;
		
		this.controlPortInputBox.max=65535;
		this.controlPortInputBox.required=true;
		this.controlPortInputBox.id="controlPort";
		this.controlPortInputBox.setAttribute("type","number");

		this.passiveModeCheckBox.id="isPassiveModeEnable";
		this.passiveModeCheckBox.onclick=function()
									{
										$(passiveModeFieldSet).toggle();
									}
		this.passiveModeCheckBox.setAttribute("type","checkbox");
		
		this.passiveModePortRangeInputBox.setAttribute("type","text");
		this.passiveModePortRangeInputBox.id="passiveModePortRange";
		
		networkSettingFieldSet.appendChild(networkSettingLegend);	
		bindingAddressFieldSet.appendChild(bindingAddressLegend);
		bindingAddressFieldSet.appendChild(this.bindingAddressDropDown);
		
		controlPortFieldSet.appendChild(controlPortLegend);
		controlPortFieldSet.appendChild(this.controlPortInputBox);
		
		passiveModeFieldSet.style.display="none";
		passiveModeFieldSet.appendChild(passiveModeLegend);
		passiveModeFieldSet.appendChild(this.passiveModePortRangeInputBox);
		
		row.className="w3-row";
		cell.className="w3-third w3-padding-small";
		cell.appendChild(bindingAddressFieldSet);
		row.appendChild(cell);
		
		cell2.className="w3-third w3-padding-small";
		cell2.appendChild(controlPortFieldSet);
		row.appendChild(cell2);
		
		cell3.className="w3-third w3-padding-small";
		cell3.appendChild(this.passiveModeCheckBox);
		cell3.appendChild(document.createTextNode(" Support Passive Mode?"));
		cell3.appendChild(passiveModeFieldSet);
		row.appendChild(cell3);
		
		networkSettingFieldSet.appendChild(row);
		networkSettingFieldSet.style.marginBottom="10px";
		networkSettingFieldSet.style.marginTop="10px";
		
		saveLink.className="w3-red w3-button w3-right w3-margin-top w3-margin-right";
		$(saveLink).html("Add <i class=\"fa fa-check\"></i>");
		this.userManagement=new UserManagement(adminPageControl);
		p.appendChild(descriptionTextNode);
		p.appendChild(this.descriptionInputBox);
		p.appendChild(networkSettingFieldSet);
	
		p.appendChild(this.userManagement.getHTML());
		p.appendChild(saveLink);
		this.domObjList=new Array();
		this.domObjList.push(heading);
		this.domObjList.push(p);
	}
	loadData(ftpServerInfo)
	{
		//var work=document.getElementById("description");
		console.log(ftpServerInfo.description);
		//console.log($(this.descriptionInputBox).position().top,$(this.descriptionInputBox).position().left);
		//console.log($(work).position().top,$(work).position().left);
		
		this.descriptionInputBox.value=ftpServerInfo.description;
		this.controlPortInputBox.value=ftpServerInfo.controlPort;
		this.passiveModePortRangeInputBox.value=ftpServerInfo.passiveModePortRange;
		this.passiveModeCheckBox.checked=ftpServerInfo.passiveModeEnabled;
		
		/*ftpServerInfo.bindingAddresses
		this.bindingAddressDropDown*/
		this.userManagement.loadData(ftpServerInfo.ftpUserInfoList);
	}
	getDomObjList()
	{
		return this.domObjList;
	}
}