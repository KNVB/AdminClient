class UserManagement
{
	constructor(adminPageControl)
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
		
		this.selectedUserId;
		this.accessRightTableX=null;
		this.userInfoList=new Array();
		this.adminServer=adminPageControl.adminServer;
		
		
		this.usersList=document.createElement("ul");
		this.warningDiv=document.createElement("div");
		this.passwordDiv=document.createElement("div");
		
		this.accessRightTable=document.createElement("table");
		this.userEnableCheckBox=document.createElement("input");
		this.userPasswordInputBox=document.createElement("input");
		this.userManagementFieldSet=document.createElement("fieldset");	
		
		$(userManagementLegend).text("User Management");
		this.userManagementFieldSet.appendChild(userManagementLegend);
		
		this.usersList.className="w3-ul";
		this.usersList.style.border="2px inset"; 
		this.usersList.style.overflowY="scroll";
		
		$(userListLegend).text("Users List");
		$(addUserButton).text("Add");
		$(addUserButton).click(function ()
								{
									self.addUser();
								});
		$(removeUserButton).text("Remove");
		$(removeUserButton).click(function ()
									{
										self.popupRemoveUserDialog();
									});
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
		var addAccessRightRowButton=document.createElement("i");
		addAccessRightRowButton.className="fa fa-plus";
		addAccessRightRowButton.style.fontSize="24px";
		addAccessRightRowButton.style.cursor="pointer";
		th.appendChild(addAccessRightRowButton);
		addAccessRightRowButton.onclick=function()
										{
											self.adminServer.getUniqueId();
											self.adminServer.getServerResponse().then(function(serverResponse)
																						{
																							var accessRightEntryId=serverResponse.returnObjects.uniqueId;
																							var accessRightEntry=new AccessRight(accessRightEntryId);
																							self.addAccessRightRow(self.selectedUserId,accessRightEntry);
																						});	
										};	
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
		var itemCount=0;
		$(this.usersList).empty();
		//$(this.accessRightTable).empty();
		this.userInfoList=userInfoList;
		if (this.accessRightTableX==null)
		{	
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
		}
		//console.log(this.userInfoList);
		if (Object.keys(this.userInfoList).length>0)
		{
			for (var key in this.userInfoList)
			{
				if (itemCount==0)
				{
					self.addUserRow(userInfoList[key],UserManagement.userNameCellSelectMode);
					itemCount=1;
				}
				else
					self.addUserRow(userInfoList[key]);
			}	
		}
		else
		{	
			this.accessRightTableX.clear().draw();
		}
	}
	popupPhyiscalDirDialog(physicalDir,userId,accessRightId)
	{
		//ale(userId+","+accessRightId);
		//console.log(physicalDir,userId,accessRightId);
		var self=this;
		var selectPhysicalDirBox=new SelectPhysicalDirBox(this.adminServer,physicalDir,userId,accessRightId);
		/*selectPhysicalDirBox.getResult().then(function(physicalDir)
											{	
												console.log(physicalDir);
											});*/
	}
	
	popupRemoveUserDialog()
	{
		var self=this;
		var userItem=$(this.usersList).children(".userInfo-highlight")[0];
		(new ConfirmBox("Are you are sure to delete user "+$(userItem).text()+"?")).then(function(confirmDelete)
																						{
																							if (confirmDelete)
																								self.removeUser(userItem.id);
																						});	
	}
	removeUser(userId)
	{
		var newUserInfoList=new Array();
		for (var id in this.userInfoList)
		{
			if (id!=userId)
			{
				newUserInfoList[id]=this.userInfoList[id];	
			}
		}
		this.loadData(newUserInfoList);
	}
	addUser()
	{
		var userInfo=new UserInfo();
		userInfo.userId=Utility.getUniqueId();
		this.userInfoList[userInfo.userId]=userInfo;
		this.addUserRow(userInfo,(UserManagement.userNameCellEditMode | UserManagement.userNameCellSelectMode));
	}
	addUserRow(userInfo,userNameCellMode)
	{
			var self=this;
			var userItem=document.createElement("li");
			let password=userInfo.password;
			let enabled=userInfo.enabled;
			let accessRightList=userInfo.accessRightEntries;
			
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
										self.selectedUserId=this.id;
										for (let key2 in accessRightList)
										{
											self.addAccessRightRow(userInfo.userId,accessRightList[key2]);
										}																				
									});
			//$(userItem).mousedown(function(e){ e.preventDefault(); });	//prevent highlight text from double click	
			$(userItem).blur(function(e)
							{
								console.log("blur");
								self.validateUserName(this);
							});
			$(userItem).on("dblclick",function ()
									  {
										this.contentEditable=true;
										this.focus();
									  });
			$(userItem).keydown(function(event)
								{
									if (event.which==13)
									{
										console.log("keydown");
										self.validateUserName(this);
										event.preventDefault();
									}
								});
			if (userNameCellMode & UserManagement.userNameCellSelectMode)
				$(userItem).click();

			if (userNameCellMode & UserManagement.userNameCellEditMode)
			{
				var evt = new Event('dblclick');
				userItem.dispatchEvent(evt);
			}

	}
	addAccessRightRow(userId,accessRightEntry)
	{
		var self=this;
		var row=document.createElement("tr");
		var cell=row.insertCell(row.cells.length);
		var virtualDirInputBox=document.createElement("input");
		let physicalDirInputBox=document.createElement("input");
		
		var deleteButton=document.createElement("i");
		
		virtualDirInputBox.setAttribute("type","text");
		virtualDirInputBox.id="virtualPath_"+userId+"_"+accessRightEntry.entryId;
		virtualDirInputBox.setAttribute("value",accessRightEntry.virtualDir);
		cell.appendChild(virtualDirInputBox);	
		
		physicalDirInputBox.setAttribute("type","text");
		physicalDirInputBox.id="physicalPath_"+userId+"_"+accessRightEntry.entryId;
		physicalDirInputBox.setAttribute("value",accessRightEntry.physicalDir);
		physicalDirInputBox.readOnly=true;
		
		physicalDirInputBox.onclick=function()
									{
										self.popupPhyiscalDirDialog(physicalDirInputBox.value,userId,accessRightEntry.entryId);
									};
		cell=row.insertCell(row.cells.length);
		cell.appendChild(physicalDirInputBox);	
		
		deleteButton.className="fa fa-trash"; 
		deleteButton.style.fontSize="25px";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(deleteButton);	
																
		var dt = $(self.accessRightTable).dataTable().api();
		dt.row.add($(row));
		dt.draw();
		
		self.userInfoList[userId].accessRightEntries[accessRightEntry.entryId]=accessRightEntry;
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
			var isDuplicated=false;
			for (var key in this.userInfoList)
			{
				var userInfoItem=this.userInfoList[key];
				if ((userInfoItem.userName==$.trim($(userNameBox).text())) &&(userInfoItem.userId!=userNameBox.id))
				{	
					isDuplicated=true;
					break;
				}
			}
			if (isDuplicated)
			{
				userNameBox.focus();
				$(self.warningDiv).show();
				self.warningDiv.innerHTML="Login Name cannot be duplicated!!";
			}
			else	
			{	
				userNameBox.contentEditable=false;
				$(self.warningDiv).hide();
				this.userInfoList[userNameBox.id].userName=$.trim($(userNameBox).text());
			}
		}
	}
	getHTML()
	{
		return this.userManagementFieldSet;
	}
}
UserManagement.userNameCellEditMode =1;
UserManagement.userNameCellSelectMode =2;