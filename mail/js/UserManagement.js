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
										self.removeUser();
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
		var itemCount=0;
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
			if (itemCount==0)
			{
				self.addRow(userInfoList[key],UserManagement.userNameCellSelectMode);
				itemCount=1;
			}
			else
				self.addRow(userInfoList[key]);
		}	
	}
	removeUser()
	{
		var userItem=$(this.usersList).children(".userInfo-highlight")[0];
		var warningModalContent=document.createElement("div");
		warningModalContent.innerHTML="Are you are sure to delete user "+$(userItem).text()+"?";
		$(warningModalContent).dialog({
										resizable: false,
										height: "auto",
										width: "auto",
										modal: true,
										buttons: {
											"Yes": function() {
												console.log(userItem.id);
											  $( this ).dialog( "close" );
											},
											"No": function() {
											  $( this ).dialog( "close" );
											}
										},
										title:"Warning!",
										open: function(event, ui) 
												{
													$(this).parent().find(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
													$(this).parent().find(".ui-dialog-titlebar").css("background-color","red");
													$(this).parent().find(".ui-dialog-titlebar").css("color","white");
													$(this).parent().find(".ui-dialog-buttonpane button").css("background-color","red");
													$(this).parent().find(".ui-dialog-buttonpane button").css("color","white");
													$(this).parent().find(".ui-widget-content").css("border","none");
													$(this).parent().find(".ui-dialog-buttonpane button:contains('No')").focus();
												}
									});


		
		//alert($(userItem).text());
		//this.userInfoList[
	}
	addUser()
	{
		var userInfo=new UserInfo();
		userInfo.userId=Utility.getUniqueId();
		this.userInfoList[userInfo.userId]=userInfo;
		this.addRow(userInfo,(UserManagement.userNameCellEditMode | UserManagement.userNameCellSelectMode));
	}
	addRow(userInfo,userNameCellMode)
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