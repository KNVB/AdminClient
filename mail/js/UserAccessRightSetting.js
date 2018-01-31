class UserAccessRightSetting
{
	constructor(thisUserData,adminPageControl)
	{	
		this.name="User Access Right";
		this.userEntryId=thisUserData.userEntryId;
		this.directoryAccessTable=document.createElement("table");
		this.containerDiv=document.createElement("div");
		
		var accessRightEntryId=Utility.getUniqueId();
		var th=document.createElement("th");
		var thead=document.createElement("thead"); 
		var permissionTable=document.createElement("table");
		var filePermissionTable=document.createElement("table");
		var folderPermissionTable=document.createElement("table");
		
		var downloadFileCheckBox=document.createElement("input");
		var uploadFileCheckBox=document.createElement("input");
		var deleteFileCheckBox=document.createElement("input");
		var listFileCheckBox=document.createElement("input");
		var createDirCheckBox=document.createElement("input");
		var listDirCheckBox=document.createElement("input");
		var removeSubDirCheckBox=document.createElement("input");
		var denyDirCheckBox=document.createElement("input");
		var hideDirCheckBox=document.createElement("input");
		
		var row=thead.insertRow(thead.rows.length);
		
		$(th).text("Virtual Path");
		row.appendChild(th);
		
		th=document.createElement("th");
		$(th).text("Physical Path");
		row.appendChild(th);
		
		th=document.createElement("th");
		$(th).html("<i class=\"fa fa-plus w3-large w3-button\"></i>");
		th.className="addEntry";
		row.appendChild(th);
		
		this.directoryAccessTable.setAttribute("width","100%");
		this.directoryAccessTable.className="display";
		this.directoryAccessTable.appendChild(thead);
		
		
		downloadFileCheckBox.setAttribute("type","checkbox");
		downloadFileCheckBox.id="downloadFile"+userEntryId;
		downloadFileCheckBox.onchange=function()
									{
										if (downloadFileCheckBox.checked)
											self.addPermissionSummaryValue("downloadFile");
										else
											self.removePermissionSummaryValue("downloadFile");			
									}
		
		uploadFileCheckBox.setAttribute("type","checkbox");
		uploadFileCheckBox.id="uploadFile"+userEntryId;
		uploadFileCheckBox.onchange=function()
									{
										if (uploadFileCheckBox.checked)
											self.addPermissionSummaryValue("uploadFile");
										else
											self.removePermissionSummaryValue("uploadFile");			
									}
		
		deleteFileCheckBox.setAttribute("type","checkbox");
		deleteFileCheckBox.id="deleteFile"+userEntryId;
		deleteFileCheckBox.onchange=function()
									{
										if (deleteFileCheckBox.checked)
											self.addPermissionSummaryValue("deleteFile");
										else
											self.removePermissionSummaryValue("deleteFile");			
									}
		
		
		listFileCheckBox.setAttribute("type","checkbox");
		listFileCheckBox.id="listFile"+userEntryId;
		listFileCheckBox.onchange=function()
									{
										if (listFileCheckBox.checked)
											self.addPermissionSummaryValue("listFile");
										else
											self.removePermissionSummaryValue("listFile");			
									}
		
		createDirCheckBox.setAttribute("type","checkbox");
		createDirCheckBox.id="createDir"+userEntryId;
		createDirCheckBox.onchange=function()
									{
										if (createDirCheckBox.checked)
											self.addPermissionSummaryValue("createDir");
										else
											self.removePermissionSummaryValue("createDir");			
									}
		
		listDirCheckBox.setAttribute("type","checkbox");
		listDirCheckBox.id="listDir"+userEntryId;
		listDirCheckBox.onchange=function()
									{
										if (listDirCheckBox.checked)
											self.addPermissionSummaryValue("listDir");
										else
											self.removePermissionSummaryValue("listDir");			
									}
		
		removeSubDirCheckBox.setAttribute("type","checkbox");
		removeSubDirCheckBox.id="removeSubDir"+userEntryId;
		removeSubDirCheckBox.onchange=function()
									{
										if (removeSubDirCheckBox.checked)
											self.addPermissionSummaryValue("removeSubDir");
										else
											self.removePermissionSummaryValue("removeSubDir");			
									}
		denyDirCheckBox.setAttribute("type","checkbox");
		denyDirCheckBox.id="denyDir"+userEntryId;
		denyDirCheckBox.onchange=function()
									{
										if (denyDirCheckBox.checked)
											self.addPermissionSummaryValue("denyDir");
										else
											self.removePermissionSummaryValue("denyDir");			
									}
									
		hideDirCheckBox.setAttribute("type","checkbox");
		hideDirCheckBox.id="hideDir"+userEntryId;
		hideDirCheckBox.onchange=function()
									{
										if (hideDirCheckBox.checked)
											self.addPermissionSummaryValue("hideDir");
										else
											self.removePermissionSummaryValue("hideDir");			
									}
		
		permissionTable.setAttribute("width","100%");
		//permissionTable.style.display="none";
		
		row=permissionTable.insertRow(permissionTable.rows.length);
		var cell=row.insertCell(row.cells.length);
		var fieldset=document.createElement("fieldset");
		var legend=document.createElement("legend");
		legend.textContent="File access";
		
		var row2=filePermissionTable.insertRow(filePermissionTable.rows.length);
		var cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Download";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(downloadFileCheckBox);
		
		row2=filePermissionTable.insertRow(filePermissionTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Upload";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(uploadFileCheckBox);

		row2=filePermissionTable.insertRow(filePermissionTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Delete";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(deleteFileCheckBox);
		
		fieldset.appendChild(legend);
		fieldset.appendChild(filePermissionTable);
		cell.appendChild(fieldset);
		
		cell=row.insertCell(row.cells.length);
		fieldset=document.createElement("fieldset");
		legend=document.createElement("legend");
		legend.textContent="Folder access"
		row2=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="List File";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(listFileCheckBox);
		
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Create Sub. Dir.";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(createDirCheckBox);
		
		row2=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="List Dir";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(listDirCheckBox);
		
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Remove Sub. Dir.";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(removeSubDirCheckBox);
		
		row2=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Deny";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(denyDirCheckBox);
		
		cell2=row2.insertCell(row2.cells.length);
		cell2.textContent="Hide";
		cell2=row2.insertCell(row2.cells.length);
		cell2.appendChild(hideDirCheckBox);

		fieldset.appendChild(legend);
		fieldset.appendChild(folderPermissionTable);
		cell.appendChild(fieldset);
		
		this.containerDiv.innerHTML="<br>";
		this.containerDiv.id=this.name+this.userEntryId;;
		this.containerDiv.className="w3-animate-left detail-setting";
		this.containerDiv.appendChild(this.directoryAccessTable);
		this.containerDiv.appendChild(permissionTable);
		
		this.directoryAccessTableX=$(this.directoryAccessTable).DataTable({
											responsive: true,
											"columnDefs": [
														   {"className": "dt-center", "targets":[2]},
														   {"orderable": false,"targets":[2]}
															],
											select: {
														style: 'single'
													},				
											"fixedHeader":true
										});

		
	}
	addAccessRightRow(accessRightDataEntry,userEntryId)
	{
		var self=this;
		var accessRightEntryId=Utility.getUniqueId();
		var pObj=document.createElement("p");
		var remoteDirDiv=document.createElement("div");
		var remoteDirContainer=document.createElement("div");
		var remoteDirList=document.createElement("ul");
		var permissionSummary=document.createElement("input");
		var physicalDirInputBox=document.createElement("input");
		var virtualDirInputBox=document.createElement("input");
		var oldPhysicalDirValue=document.createElement("input");
		var showRemoteDirBtn=document.createElement("input");
		var resumeOldSettingBtn=document.createElement("input");
		var hideRemoteDirBtn=document.createElement("input");
		
		remoteDirDiv.id="remoteDirDiv"+userEntryId+"_"+accessRightEntryId;
		remoteDirDiv.className="remoteDirDiv";
		remoteDirContainer.className="remoteDirContainer";
		remoteDirContainer.id="remoteDirContainer"+userEntryId+"_"+accessRightEntryId;
		remoteDirList.style="padding:0px;margin:0px";
		remoteDirList.id="remoteDirList"+userEntryId+"_"+accessRightEntryId;
		remoteDirContainer.appendChild(remoteDirList);
		
		permissionSummary.setAttribute("type", "hidden");
		permissionSummary.id="permissionSummary"+userEntryId+"_"+accessRightEntryId;
		
		virtualDirInputBox.required = true;
		virtualDirInputBox.id="virtualDir"+userEntryId+"_"+accessRightEntryId;
		virtualDirInputBox.setAttribute("type", "text");
		if (accessRightDataEntry!=null)
		{
			virtualDirInputBox.setAttribute("value",accessRightDataEntry.virtualDir);
		}
		physicalDirInputBox.readOnly=true;
		physicalDirInputBox.required = true;
		physicalDirInputBox.id="physicalDir"+userEntryId+"_"+accessRightEntryId;
		physicalDirInputBox.setAttribute("type", "text");
		if (accessRightDataEntry!= null)
		{
			physicalDirInputBox.setAttribute("value",accessRightDataEntry.physicalDir);
		}
		
		oldPhysicalDirValue.id="oldPhysicalDirValue"+userEntryId+"_"+accessRightEntryId;
		oldPhysicalDirValue.setAttribute("type", "hidden");
		if (accessRightDataEntry!= null)
		{
			oldPhysicalDirValue.setAttribute("value",accessRightDataEntry.physicalDir);
		}
		
		showRemoteDirBtn.value="...";
		showRemoteDirBtn.setAttribute("type", "button");
		showRemoteDirBtn.onclick=function()
								 {
									self.getRemoteDir(self,userEntryId,accessRightEntryId);
								 };
		
		resumeOldSettingBtn.value="Cancel";
		resumeOldSettingBtn.setAttribute("type", "button");
		resumeOldSettingBtn.onclick=function()
									{
										self.resumeOldSetting(userEntryId,accessRightEntryId);
									};
		
		hideRemoteDirBtn.value="Ok";
		hideRemoteDirBtn.setAttribute("type", "button");
		hideRemoteDirBtn.onclick=function()
								{
									self.hideRemoteDir(userEntryId,accessRightEntryId);
								};
		
		var row=this.table.insertRow(this.table.rows.length);
		var cell=row.insertCell(row.cells.length);
		
		cell.appendChild(virtualDirInputBox);
		cell.appendChild(permissionSummary);
		
		cell=row.insertCell(row.cells.length);
		cell.appendChild(physicalDirInputBox);
		cell.innerHTML+="\n";
		cell.appendChild(showRemoteDirBtn);
		
		remoteDirDiv.appendChild(pObj);
		pObj.appendChild(remoteDirContainer);
		pObj.appendChild(oldPhysicalDirValue);
		pObj.appendChild(resumeOldSettingBtn);
		pObj.appendChild(hideRemoteDirBtn);
		
		cell.appendChild(remoteDirDiv);
		cell=row.insertCell(row.cells.length);
		cell.className="removeEntry";
		cell.innerHTML="&#x1F5D1;";
		cell.onclick=function ()
					{
						$(row).addClass("selected");
						self.accessRightTable.row(".selected").remove().draw(true);
					}
		row.id=accessRightEntryId;
		var dt = $(this.directoryAccessTable).dataTable().api();
		dt.row.add($(row));
		dt.draw();
		
		
		
	}
	getDomObj()
	{
		return this.containerDiv;
	}
}