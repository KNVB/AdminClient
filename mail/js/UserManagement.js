class UserManagement
{
	constructor()
	{
		var border=0;
		var self=this;
		var row,cell,row2,cell2;
		var th=document.createElement("th");
		var row=document.createElement("div");
		var cell=document.createElement("div");
		var cell2=document.createElement("div");
		var cell3=document.createElement("div");
		var spacer=document.createElement("div");
	
		var thead=document.createElement("thead"); 
		//var tbody1=document.createElement("TBODY");
		
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
		
		this.accessRightTableX=null;
		this.userInfoList=new Array();
		this.usersList=document.createElement("ul");
		this.warningDiv=document.createElement("div");
		this.passwordDiv=document.createElement("div");
		
		this.accessRightTable=document.createElement("table");
		this.userEnableCheckBox=document.createElement("input");
		this.userPasswordInputBox=document.createElement("input");
		this.userManagementFieldSet=document.createElement("fieldset");	
		
		$(userManagementLegend).text("User Management");
		this.userManagementFieldSet.appendChild(userManagementLegend);
		
		this.usersList.className="w3-ul w3-hoverable";
		this.usersList.style.border="2px inset"; 
		this.usersList.style.overflowY="scroll";
		/*this.usersList.innerHTML="<li>Jill</li>";
		this.usersList.innerHTML+="<li>Eve</li>";
		this.usersList.innerHTML+="<li>Adam</li>";*/
		
		$(userListLegend).text("Users List");
		$(addUserButton).text("Add");
		$(removeUserButton).text("Remove");
		$(copyUserButton).text("Copy");
		addUserButton.className="w3-button";
		removeUserButton.className="w3-button";
		copyUserButton.className="w3-button";
		spacer.className="w3-padding-small";
		this.warningDiv.className="w3-panel w3-red";
		$(this.warningDiv).hide();
		
		usersListFieldSet.appendChild(userListLegend);
		usersListFieldSet.appendChild(this.usersList);
		usersListFieldSet.appendChild(spacer);
		usersListFieldSet.appendChild(addUserButton);
		usersListFieldSet.appendChild(removeUserButton);
		usersListFieldSet.appendChild(copyUserButton);
		usersListFieldSet.appendChild(this.warningDiv);
		
		row.className="w3-row";
		cell.className="w3-third w3-padding-small";		
		cell.appendChild(usersListFieldSet);
		row.appendChild(cell);
		
		this.passwordDiv.style.display="none"; //for edge 
		$(accountSettingLegend).text("Account Setting");
		this.userEnableCheckBox.id="isUserEnabled";
		this.userEnableCheckBox.setAttribute("type","checkbox");
		this.userEnableCheckBox.onclick=function()
										{
											$(self.passwordDiv).toggle();	
										}
		
		this.userPasswordInputBox.id="userPassword";
		this.userPasswordInputBox.setAttribute("type","password");
		this.userPasswordInputBox.required=true;
		
		this.passwordDiv.appendChild(document.createTextNode("Password:"));
		this.passwordDiv.appendChild(this.userPasswordInputBox);
		
		accountSettingFieldSet.appendChild(accountSettingLegend);
		accountSettingFieldSet.appendChild(this.userEnableCheckBox);
		accountSettingFieldSet.appendChild(document.createTextNode(" "));
		accountSettingFieldSet.appendChild(document.createTextNode("Enable"));
		accountSettingFieldSet.appendChild(document.createElement("br"));
		accountSettingFieldSet.appendChild(this.passwordDiv);
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
		this.accessRightTable.id="accessRightTable";
		this.accessRightTable.border=border;
		this.accessRightTable.appendChild(thead);
		this.accessRightTable.className="display responsive no-wrap";
		this.accessRightTable.setAttribute("width","100%");
		accessRightFieldSet.appendChild(this.accessRightTable);
		
		row.className="w3-row";
		cell3.className="w3-padding-small";
		cell3.appendChild(accessRightFieldSet);
		row.appendChild(cell3);
		this.userManagementFieldSet.appendChild(row);
				
	}
	loadData(userInfoList)
	{
		var self=this;
		$(this.usersList).empty();
		this.userInfoList=userInfoList;
		this.accessRightTableX=$(this.accessRightTable).DataTable({ 
																	responsive: true,
																	"columnDefs": 
																	[
																	   {"className": "dt-center", "targets":[2]},
																	   {"orderable": false,"targets":[2]}
																    ],
																	select: {
																		style: 'single'
																	},				
																	"fixedHeader":true
																  });
		for (var key in this.userInfoList)
		{
			self.addRow(userInfoList[key]);
		}
		if (this.userInfoList.length>0)
		{
			var firstItem=$(this.usersList).find("li:first-child");
			$(firstItem).click();
		}
	}
	addRow(userInfo)
	{
			var self=this;
			var userItem=document.createElement("li");
			let password=userInfo.password;
			let enabled=userInfo.enabled;
			let accessRightList=userInfo.accessRightList;
			
			userItem.className="userInfo";
			userItem.id=userInfo.userId;
			$(userItem).text(userInfo.userName);
			this.usersList.appendChild(userItem);
			
			$(userItem).on("click",function()
															{
																	$(".userInfo-highlight").each(function()
																	{
																		this.className="userInfo";
																	});
																	this.className="userInfo-highlight";
																	self.userPasswordInputBox.value=password;
																	self.userEnableCheckBox.checked=enabled;
																	
																	if (enabled)
																	{
																		self.passwordDiv.style.display="block";
																	}
																	else
																	{
																		self.passwordDiv.style.display="none";
																	}
																	self.accessRightTableX.clear();
																	
																	for (var key2 in accessRightList)
																	{
																		var physicalDirInputBox=document.createElement("input");
																		physicalDirInputBox.setAttribute("type","text");
																		physicalDirInputBox.id="physicalPath_"+userInfo.userId+"_"+key2;
																		physicalDirInputBox.setAttribute("value",accessRightList[key2].physicalDir);
																		physicalDirInputBox.readOnly=true;
																		physicalDirInputBox.onclick=function()
																									{
																										
																									};
																		self.accessRightTableX.row.add([
																										"<input type=text id=\"virtualPath_"+userInfo.userId+"_"+key2+"\" value=\""+accessRightList[key2].virtualDir+"\">",
																										physicalDirInputBox.outerHTML,
																										"<i class=\"fa fa-trash\" style=\"font-size:25px\"></i>"
																										]).draw();
																	}																				
															});
			//$(userItem).mousedown(function(e){ e.preventDefault(); });	//prevent highlight text from double click	
			$(userItem).blur(function(e)
							{
								self.validateUserName(this);
							});
			$(userItem).on("dblclick",function ()
									  {
										this.contentEditable=true;
									  });
			$(userItem).keydown(function(event)
								{
									if (event.which==13)
									{
										self.validateUserName(this);
										event.preventDefault();
									}
								});
	}
	validateUserName(userNameBox)
	{
		var self=this;
		if ($.trim($(userNameBox).text())=="")
		{	
			userNameBox.focus();
			$(self.warningDiv).show();
			self.warningDiv.innerHTML="Login Name cannot be empty!!";
		}
		else
		{	
			userNameBox.contentEditable=false;
			$(self.warningDiv).hide();
		}
	}
	getHTML()
	{
		return this.userManagementFieldSet;
	}
}
