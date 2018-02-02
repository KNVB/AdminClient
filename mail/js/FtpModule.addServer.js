class FtpModule_AddServer
{
	constructor(adminPageControl)
	{
		var row,cell;
		var self=this;
		var p=document.createElement("p");
		var saveLink=document.createElement("a");
		var heading=document.createTextNode("FTP Server Administration > Add Server");
		var descriptionInputBox=document.createElement("input");
		var controlPortInputBox=document.createElement("input");
		var passiveModeCheckBox=document.createElement("input");

		var networkSettingTable=document.createElement("table");
		var networkSettingLegend=document.createElement("Legend");
		var networkSettingFieldSet=document.createElement("fieldset");
		
		var bindingAddressDropDown=document.createElement("select");
		var descriptionTextNode=document.createTextNode("Description:");
		
		var passiveModePortRangeInputBox=document.createElement("input");
		
		this.userManagement=new UserManagement(adminPageControl);
		
		this.passiveModePortRangeDiv=document.createElement("div");
		this.passiveModePortRangeDiv.style.visibility="hidden";
		bindingAddressDropDown.id="bindingAddress";
		bindingAddressDropDown.multiple = true;
		
		controlPortInputBox.id="controlPort";
		controlPortInputBox.setAttribute("type","number");
		controlPortInputBox.value=21;
		controlPortInputBox.min=1;
		controlPortInputBox.max=65535;
		controlPortInputBox.required=true;
		
		passiveModePortRangeInputBox.setAttribute("type","text");
		passiveModePortRangeInputBox.id="passiveModePortRange";
		passiveModePortRangeInputBox.required=true;
		
		passiveModeCheckBox.id="isPassiveModeEnable";
		passiveModeCheckBox.setAttribute("type","checkbox");
		passiveModeCheckBox.onclick=function()
									{
										if (self.passiveModePortRangeDiv.style.visibility=="hidden")
											self.passiveModePortRangeDiv.style.visibility="visible";
										else
											self.passiveModePortRangeDiv.style.visibility="hidden";
									}	
		
		
		row=networkSettingTable.insertRow(networkSettingTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.appendChild(bindingAddressDropDown);
		
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="middle";
		cell.appendChild(controlPortInputBox);
		
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="top";
		cell.appendChild(passiveModeCheckBox);
		
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="top";
		cell.appendChild(document.createTextNode(" Passive Mode"));
		this.passiveModePortRangeDiv.appendChild(document.createTextNode("Port Range for Passive Mode:"));
		this.passiveModePortRangeDiv.appendChild(passiveModePortRangeInputBox);
		cell.appendChild(this.passiveModePortRangeDiv);
		
		networkSettingTable.className="w3-responsive";
		$(networkSettingLegend).text("Network related setting");
		
		networkSettingFieldSet.style.width="w3-table";
		networkSettingFieldSet.appendChild(networkSettingLegend);
		networkSettingFieldSet.appendChild(networkSettingTable);
		
		saveLink.className="w3-red w3-button w3-right w3-margin-top w3-margin-right";
		$(saveLink).html("Add <i class=\"fa fa-check\"></i>");
		p.appendChild(descriptionTextNode);
		p.appendChild(descriptionInputBox);
		p.innerHTML+="<br><br>";
		p.appendChild(networkSettingFieldSet);
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