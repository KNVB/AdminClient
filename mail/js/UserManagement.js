class UserManagement
{
	constructor(adminPageControl)
	{
		var cell,span,self=this;
		var th=document.createElement("th");
		var thead=document.createElement("thead"); 
		var tbody=document.createElement("tbody");
		var row=thead.insertRow(thead.rows.length);
		var legend=document.createElement("legend");
		
		this.detailSettingArray=new Array();
		this.adminPageControl=adminPageControl;
		this.table=document.createElement("table");
		this.fieldset=document.createElement("fieldset");
		
		$(this.fieldset).append(legend);
		$(legend).text("User Management");
		
		$(th).text("User Name");
		$(row).append(th);
		
		th=document.createElement("th");
		$(th).text("Password");
		$(row).append(th);
		
		th=document.createElement("th");
		$(th).text("Detail Setting");
		$(row).append(th);

		th=document.createElement("th");
		$(th).text("Enabled");
		$(row).append(th);

		th=document.createElement("th");
		$(th).text("Remove");
		$(row).append(th);
		this.table.appendChild(thead);
		this.table.className="display responsive no-wrap";
		this.table.style.width="100%";
		this.fieldset.appendChild(this.table);
		this.userTable=$(this.table).DataTable(
					{ 
						"dom": '<"toolbar">frtip',
						"CaseSensitive":true, 
						"order": [[ 0, "desc" ]],
						paging: true,
						"pageLength": 10,
						responsive: true,
						"info": true,
						"orderCellsTop": true, 
						"fixedHeader":true,
						"columnDefs": [{"className": "dt-center", "targets": [2,3,4]},
										{"orderable": false,"targets":[1,2,3,4]}
									  ],
					})
		var toolbar=$(this.fieldset).children("div").children(".toolbar")
		
		$(toolbar).html("&nbsp;<i class=\"fa fa-plus w3-large w3-button\"></i>");					
		$(toolbar).on("click",function()
								{
									var userData={accessRightList:[{virtualDir:"/",physicalDir:"/",permission:""}]}
									self.addUserRow(userData);
								});
	}
	getHTML()
	{
		return this.fieldset;
	}
	addUserRow(thisUserData)
	{
		var self=this;
		var tbody=this.userTable.table().body();
		var entryId=Utility.getUniqueId();
		var deleteEntrySpan=document.createElement("span");
		var popupDetailSettingSpan=document.createElement("span");
		var detailSetting=document.createElement("input");
		var userNameInputBox=document.createElement("input");
		var passwordInputBox=document.createElement("input");
		var userEnableCheckBox=document.createElement("input");
		var isRemoveThisUserInputBox=document.createElement("input");
																		
		var row=document.createElement("tr");
		
		userNameInputBox.id="userName"+entryId;
		userNameInputBox.setAttribute("type","text");
		userNameInputBox.required = true;
		
		detailSetting.id="detailSetting"+entryId;
		detailSetting.setAttribute("type","hidden");
		
		passwordInputBox.id="password"+entryId;
		passwordInputBox.required = true;
		passwordInputBox.setAttribute("type","password");					
		
		userEnableCheckBox.id="isUserEnable"+entryId;
		userEnableCheckBox.setAttribute("type","checkbox");
		
		isRemoveThisUserInputBox.id="isRemoveThisUser"+entryId;
		isRemoveThisUserInputBox.setAttribute("type","hidden");
		isRemoveThisUserInputBox.value=0;
		
		popupDetailSettingSpan.className="popupDetailSettingPage";
		popupDetailSettingSpan.innerHTML="<i class=\"w3-padding fa fa-pencil w3-button\"></i>";
		popupDetailSettingSpan.onclick=function()
									 {
										thisUserData["entryId"]=entryId;
										thisUserData["userName"]=userNameInputBox.value;
										self.popupDetailSettingModal(self,thisUserData);
									 };
		deleteEntrySpan.innerHTML="<i class=\"fa fa-trash w3-button\" style=\"font-size:25px\"></i>";
		deleteEntrySpan.className="removeEntry";
		$(deleteEntrySpan).click(function()
					{
						self.removeRow(row,entryId);
					});
		
		
		var cell=row.insertCell(row.cells.length);
		cell.appendChild(userNameInputBox);
		cell.appendChild(detailSetting);
		
		cell=row.insertCell(row.cells.length);
		cell.appendChild(passwordInputBox);
		
		cell=row.insertCell(row.cells.length);
		cell.appendChild(popupDetailSettingSpan);

		cell=row.insertCell(row.cells.length);
		cell.appendChild(userEnableCheckBox);

		cell=row.insertCell(row.cells.length);
		cell.appendChild(deleteEntrySpan);
		cell.appendChild(isRemoveThisUserInputBox);
		
		if ((thisUserData.userName!=null))
		{
			if (thisUserData.userName=="anonymous")
			{
				userNameInputBox.setAttribute("type","hidden");
				cell=$(userNameInputBox).parent();
				cell.attr("data-order","0");
				var textNode=document.createTextNode("anonymous");
				$(textNode).insertBefore(userNameInputBox);
				$(passwordInputBox).remove();
				$(deleteEntrySpan).remove();
			}
			else
			{
				passwordInputBox.setAttribute("value",thisUserData.password);
			}
			userNameInputBox.setAttribute("value",thisUserData.userName);
		}
		var dt = $(this.table).dataTable().api();
		dt.row.add($(row));
		dt.draw();
	}
	popupDetailSettingModal(self,thisUserData)
	{
		var userDetailSetting=new UserDetailSetting(thisUserData,self.adminPageControl);
		//var accessRightData=thisUserData.accessRightList;
/*		if (userEntryId in this.detailSettingArray)
		{
			this.detailSettingArray[userEntryId].show();
		}
		else
		{
			var userDetailSetting=new UserDetailSetting(userEntryId,self.adminPageControl);
			/*var accessRight=new AccessRight(userEntryId,self.adminPageControl);
			accessRight.loadData(accessRightData,userEntryId);
			this.detailSettingArray[userEntryId]=accessRight;
		}*/				
	}
	removeRow(row,userCount)
	{
		var userName=$("#userName"+userCount).val();
		var password=$("#password"+userCount).val();
		if ((userName=="") && (password==""))
		{	
			$(row).addClass("selected");
			this.userTable.row(".selected").remove().draw(true);
		}
		else	
		{
			var field=document.getElementById("isRemoveThisUser"+userCount);
			field.value="1";
			$(row).hide();
		}
	}
	updateRemoteDir(userEntryId,accessRightEntryId,dirList)
	{
		//this.userManagement.updateRemoteDir(userEntryId,accessRightEntryId,dirList);
		var accessRight=this.accessRightArray[userEntryId];
		accessRight.updateRemoteDir(userEntryId,accessRightEntryId,dirList);
	}
}
