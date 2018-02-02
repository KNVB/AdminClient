class UserManagement
{
	constructor()
	{
		var row,cell,row2,cell2;
		var border=1;
		var userPasswordInputBox=document.createElement("input");
		var userEnableCheckBox=document.createElement("input");
		var addUserButton=document.createElement("Span");
		var removeUserButton=document.createElement("Span");
		var copyUserButton=document.createElement("Span");
		
		var accountSettingTable=document.createElement("table");
		var userManagementTable=document.createElement("table");
		var userManagementLegend=document.createElement("Legend");
		
		this.usersDropDownBox=document.createElement("select");
		this.usersDropDownBox.style.width="100%";
		this.usersDropDownBox.multiple = true;
		
		$(userManagementLegend).text("User Management");
		
		userManagementTable.style.width="100%";
		userManagementTable.border=border;
		accountSettingTable.style.width="100%";
		accountSettingTable.border=border;
		
		userEnableCheckBox.id="isUserEnabled";
		userEnableCheckBox.setAttribute("type","checkbox");
		
		userPasswordInputBox.id="userPassword";
		userPasswordInputBox.setAttribute("type","password");
		userPasswordInputBox.required=true;
		
		$(addUserButton).text("Add");
		$(removeUserButton).text("Remove");
		$(copyUserButton).text("Copy");
		addUserButton.className="w3-button";
		removeUserButton.className="w3-button";
		copyUserButton.className="w3-button";
		
		row=userManagementTable.insertRow(userManagementTable.rows.length);
		row.style.verticalAlign="top";
		cell=row.insertCell(row.cells.length);
		cell.rowSpan=10;
		cell.appendChild(document.createTextNode("Users"));
		cell.appendChild(document.createElement("br"));
		cell.appendChild(this.usersDropDownBox);
		
		cell.appendChild(addUserButton);
		cell.appendChild(removeUserButton);
		cell.appendChild(copyUserButton);
		
		cell=row.insertCell(row.cells.length);
		cell.appendChild(document.createTextNode("Account Setting"));
		cell.appendChild(accountSettingTable);
		
		row2=accountSettingTable.insertRow(accountSettingTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(document.createTextNode("Password:"));
		cell2.appendChild(userPasswordInputBox);
		cell2.appendChild(document.createTextNode(" "));
		cell2.appendChild(userEnableCheckBox);
		cell2.appendChild(document.createTextNode("Enable"));

		cell.appendChild(document.createTextNode("Access Right"));
		
		this.userManagementFieldSet=document.createElement("fieldset");
		this.userManagementFieldSet.appendChild(userManagementLegend);
		this.userManagementFieldSet.appendChild(userManagementTable);
	}
	getHTML()
	{
		return this.userManagementFieldSet;
	}
}
