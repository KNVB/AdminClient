class UserManagement
{
	constructor()
	{
		var border=1;
		var row,cell,row2,cell2;
		var th=document.createElement("th");
		var row=document.createElement("div");
		var cell=document.createElement("div");
		var cell2=document.createElement("div");
		var cell3=document.createElement("div");
		var spacer=document.createElement("div");
		var passwordDiv=document.createElement("div");
		
		var thead=document.createElement("thead"); 
		var tbody1=document.createElement("TBODY");
		
		var userEnableCheckBox=document.createElement("input");
		var userPasswordInputBox=document.createElement("input");
		
		var addUserButton=document.createElement("Span");
		var copyUserButton=document.createElement("Span");
		var removeUserButton=document.createElement("Span");
		
		var userListLegend=document.createElement("Legend");
		var accessRightLegend=document.createElement("Legend");
		var accountSettingLegend=document.createElement("Legend");
		var userManagementLegend=document.createElement("Legend");
		
		var usersListFieldSet=document.createElement("fieldset");
		var accessRightFieldSet=document.createElement("fieldset");	
		var accountSettingFieldSet=document.createElement("fieldset");	
		
		this.usersList=document.createElement("ul");
		this.accessRightTable=document.createElement("table");
		this.userManagementFieldSet=document.createElement("fieldset");	
		
		$(userManagementLegend).text("User Management");
		this.userManagementFieldSet.appendChild(userManagementLegend);
		
		this.usersList.className="w3-ul w3-hoverable";
		this.usersList.style.border="2px inset"; 
		this.usersList.style.overflowY="scroll";
		this.usersList.innerHTML="<li>Jill</li>";
		this.usersList.innerHTML+="<li>Eve</li>";
		this.usersList.innerHTML+="<li>Adam</li>";
		
		$(userListLegend).text("Users List");
		$(addUserButton).text("Add");
		$(removeUserButton).text("Remove");
		$(copyUserButton).text("Copy");
		addUserButton.className="w3-button";
		removeUserButton.className="w3-button";
		copyUserButton.className="w3-button";
		spacer.className="w3-padding-small";
		usersListFieldSet.appendChild(userListLegend);
		usersListFieldSet.appendChild(this.usersList);
		usersListFieldSet.appendChild(spacer);
		usersListFieldSet.appendChild(addUserButton);
		usersListFieldSet.appendChild(removeUserButton);
		usersListFieldSet.appendChild(copyUserButton);
		
		row.className="w3-row";
		cell.className="w3-third w3-padding-small";		
		cell.appendChild(usersListFieldSet);
		row.appendChild(cell);
		
		passwordDiv.style.display="none"; //for edge 
		$(accountSettingLegend).text("Account Setting");
		userEnableCheckBox.id="isUserEnabled";
		userEnableCheckBox.setAttribute("type","checkbox");
		userEnableCheckBox.onclick=function()
									{
										$(passwordDiv).toggle();	
									}
		
		userPasswordInputBox.id="userPassword";
		userPasswordInputBox.setAttribute("type","password");
		userPasswordInputBox.required=true;
		
		passwordDiv.appendChild(document.createTextNode("Password:"));
		passwordDiv.appendChild(userPasswordInputBox);
		
		accountSettingFieldSet.appendChild(accountSettingLegend);
		accountSettingFieldSet.appendChild(userEnableCheckBox);
		accountSettingFieldSet.appendChild(document.createTextNode(" "));
		accountSettingFieldSet.appendChild(document.createTextNode("Enable"));
		accountSettingFieldSet.appendChild(document.createElement("br"));
		accountSettingFieldSet.appendChild(passwordDiv);
		cell2.className="w3-twothird w3-padding-small";
		cell2.appendChild(accountSettingFieldSet);
		row.appendChild(cell2);
		
		this.userManagementFieldSet.appendChild(row);
		
		row=document.createElement("div");
		$(accessRightLegend).text("Access Right");
		accessRightFieldSet.appendChild(accessRightLegend);
		row2=thead.insertRow(thead.rows.length);
		$(th).text("Virtual Path");
		row2.appendChild(th);
		
		th=document.createElement("th");
		$(th).text("Physical Path");
		row2.appendChild(th);
		
		th=document.createElement("th");
		$(th).html("<i class=\"fa fa-plus\" style=\"font-size:24px\"></i>");
		row2.appendChild(th);
		this.accessRightTable.border=border;
		this.accessRightTable.appendChild(thead);
		this.accessRightTable.className="display";
		this.accessRightTable.setAttribute("width","100%");
		accessRightFieldSet.appendChild(this.accessRightTable);
		
		
		
		row.className="w3-row";
		cell3.className="w3-padding-small";
		cell3.appendChild(accessRightFieldSet);
		row.appendChild(cell3);
		this.userManagementFieldSet.appendChild(row);	
	}
	getHTML()
	{
		return this.userManagementFieldSet;
	}
}
