class FtpModule_AddServer
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
		var spacer=document.createElement("div");
		var saveLink=document.createElement("a");
		
		var descriptionInputBox=document.createElement("input");
		var controlPortInputBox=document.createElement("input");
		var passiveModeCheckBox=document.createElement("input");
		var bindingAddressDropDown=document.createElement("select");
		var passiveModePortRangeInputBox=document.createElement("input");
		
		var controlPortLegend=document.createElement("Legend");
		var passiveModeLegend=document.createElement("Legend");
		var networkSettingLegend=document.createElement("Legend");
		var bindingAddressLegend=document.createElement("Legend");
		
		var bindingAddressFieldSet=document.createElement("fieldset");
		var controlPortFieldSet=document.createElement("fieldset");
		var passiveModeFieldSet=document.createElement("fieldset");
		var networkSettingFieldSet=document.createElement("fieldset");

		var descriptionTextNode=document.createTextNode("Description:");
		
		
		

		spacer.className="w3-padding-small";
		$(networkSettingLegend).text("Network related setting");
		$(bindingAddressLegend).text("Binding Address");
		$(controlPortLegend).text("Port Listening");
		$(passiveModeLegend).text("Custom port range for passive mode:");
		
		descriptionInputBox.id="description";

		bindingAddressDropDown.id="bindingAddress";
		bindingAddressDropDown.multiple=true;
		
		controlPortInputBox.min=1;
		controlPortInputBox.value=21;
		controlPortInputBox.max=65535;
		controlPortInputBox.required=true;
		controlPortInputBox.id="controlPort";
		controlPortInputBox.setAttribute("type","number");

		passiveModeCheckBox.id="isPassiveModeEnable";
		passiveModeCheckBox.onclick=function()
									{
										$(passiveModeFieldSet).toggle();
									}
		passiveModeCheckBox.setAttribute("type","checkbox");
		
		passiveModePortRangeInputBox.setAttribute("type","text");
		passiveModePortRangeInputBox.id="passiveModePortRange";
		
		networkSettingFieldSet.appendChild(networkSettingLegend);	
		bindingAddressFieldSet.appendChild(bindingAddressLegend);
		bindingAddressFieldSet.appendChild(bindingAddressDropDown);
		
		controlPortFieldSet.appendChild(controlPortLegend);
		controlPortFieldSet.appendChild(controlPortInputBox);
		
		passiveModeFieldSet.style.display="none";
		passiveModeFieldSet.appendChild(passiveModeLegend);
		passiveModeFieldSet.appendChild(passiveModePortRangeInputBox);
		
		row.className="w3-row";
		cell.className="w3-third w3-padding-small";
		cell.appendChild(bindingAddressFieldSet);
		row.appendChild(cell);
		
		cell2.className="w3-third w3-padding-small";
		cell2.appendChild(controlPortFieldSet);
		row.appendChild(cell2);
		
		cell3.className="w3-third w3-padding-small";
		cell3.appendChild(passiveModeCheckBox);
		cell3.appendChild(document.createTextNode(" Support Passive Mode?"));
		cell3.appendChild(passiveModeFieldSet);
		row.appendChild(cell3);
		
		networkSettingFieldSet.appendChild(row);
		saveLink.className="w3-red w3-button w3-right w3-margin-top w3-margin-right";
		$(saveLink).html("Add <i class=\"fa fa-check\"></i>");
		this.userManagement=new UserManagement(adminPageControl);
		p.appendChild(descriptionTextNode);
		p.appendChild(descriptionInputBox);
		p.innerHTML+="<br><br>";
		p.appendChild(networkSettingFieldSet);
		p.appendChild(spacer);
		p.appendChild(this.userManagement.getHTML());
		p.appendChild(saveLink);
		this.domObjList=new Array();
		this.domObjList.push(heading);
		this.domObjList.push(p);
	}
	
	getDomObjList()
	{
		return this.domObjList;
	}
}