class UserAccessRightSetting
{
	constructor(userInfo,adminPageControl)
	{	
		this.name="User Access Right";
		this.userInfo=userInfo;
		this.accessRightDiv=document.createElement("div");
		this.permissionTable=document.createElement("table");
		this.directoryAccessTable=document.createElement("table");
		
		this.genDirectoryAccessTable();
		this.genPermissionTable();
				
		this.accessRightDiv.className="w3-animate-left detail-setting";
		this.accessRightDiv.id=this.name+userInfo.userId;
		this.accessRightDiv.innerHTML="<br>";
		this.accessRightDiv.appendChild(this.directoryAccessTable);
		this.accessRightDiv.appendChild(this.permissionTable);
		
		this.accessRightTable=$(this.directoryAccessTable).DataTable({
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
												
		for (var i=0;i<userInfo.accessRightList.length;i++)
		{
			this.addAccessRightRow(userInfo.accessRightList[i],userInfo.userId);
		}			
	}
	addAccessRightRow(accessRightData,userId)
	{
		var row,cell;
		var remoteDirDiv=document.createElement("div");
		var remoteDirContainer=document.createElement("div");
		var remoteDirList=document.createElement("ul");
		var permissionSummary=document.createElement("input");
		var physicalDirInputBox=document.createElement("input");
		var virtualDirInputBox=document.createElement("input");
		var oldPhysicalDirValue=document.createElement("input");
		var showRemoteDirSpan=document.createElement("span");
		var resumeOldSettingBtn=document.createElement("input");
		var hideRemoteDirBtn=document.createElement("input");
		
		virtualDirInputBox.required = true;
		virtualDirInputBox.setAttribute("type","text");
		//virtualDirInputBox.style.width="100%";
		virtualDirInputBox.id="virtualDir"+userId+"_"+accessRightData.id;
		virtualDirInputBox.value=accessRightData.virtualDir;
		
		physicalDirInputBox.readOnly=true;
		physicalDirInputBox.required = true;
		//physicalDirInputBox.style.width="100%";
		physicalDirInputBox.setAttribute("type","text");
		physicalDirInputBox.id="physicalDir"+userId+"_"+accessRightData.id;
		physicalDirInputBox.value=accessRightData.physicalDir;
		
		showRemoteDirSpan.className="w3-button w3-small";
		showRemoteDirSpan.innerHTML="...";
		
		row=this.directoryAccessTable.insertRow(this.directoryAccessTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="text-top";
		cell.appendChild(virtualDirInputBox);
		
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="text-top";
		cell.appendChild(physicalDirInputBox);
		cell.appendChild(showRemoteDirSpan);
		
		
		cell=row.insertCell(row.cells.length);
		cell.style.verticalAlign="text-top";
		cell.innerHTML="<i class=\"fa fa-trash w3-button\" style=\"font-size:25px\"></i>";
		
		
		var dt = $(this.directoryAccessTable).dataTable().api();
		dt.row.add($(row));
		dt.draw();
	}
	getDomObj()
	{
		return this.accessRightDiv;
	}
	genDirectoryAccessTable()
	{
		var self=this;
		var th=document.createElement("th");
		var thead=document.createElement("thead"); 
		var row=thead.insertRow(thead.rows.length);
		
		$(th).text("Virtual Path");
		row.appendChild(th);
		
		th=document.createElement("th");
		$(th).text("Physical Path");
		row.appendChild(th);
		
		th=document.createElement("th");
		$(th).html("<i class=\"fa fa-plus w3-large w3-button\"></i>");
		th.className="addEntry";
		th.onclick=function ()
					{
						//self.addAccessRightRow({d:"0",virtualDir:"",physicalDir:"/"},self.userInfo.userId);
						self.addAccessRightRow(new AccessRight(Utility.getUniqueId()),self.userInfo.userId);
					};
		
		row.appendChild(th);
		this.directoryAccessTable.appendChild(thead);
		this.directoryAccessTable.style.width="100%";
		this.directoryAccessTable.setAttribute("border","0");
		this.directoryAccessTable.className="display";
	}
	genPermissionTable()
	{
		var self=this;
		this.permissionTable.style.width="100%";
		var folderPermissionTable=document.createElement("table");
		var filePermissionTable=document.createElement("table");
		var folderPermissionFieldSet=document.createElement("fieldset");
		var filePermissionFieldSet=document.createElement("fieldset");
		var filePermissionLegend=document.createElement("legend");
		var folderPermissionLegend=document.createElement("legend");
		var downloadFileCheckBox=document.createElement("input");
		var uploadFileCheckBox=document.createElement("input");
		var deleteFileCheckBox=document.createElement("input");
		var listFileCheckBox=document.createElement("input");
		var createDirCheckBox=document.createElement("input");
		var listDirCheckBox=document.createElement("input");
		var removeSubDirCheckBox=document.createElement("input");
		var denyDirCheckBox=document.createElement("input");
		var hideDirCheckBox=document.createElement("input");
		
		var row=this.permissionTable.insertRow(this.permissionTable.rows.length);
		var cell=row.insertCell(row.cells.length);
		cell.appendChild(filePermissionFieldSet);
		cell=row.insertCell(row.cells.length);
		cell.appendChild(folderPermissionFieldSet);
		
		downloadFileCheckBox.setAttribute("type","checkbox");
		downloadFileCheckBox.id="downloadFile";
		
		uploadFileCheckBox.setAttribute("type","checkbox");
		uploadFileCheckBox.id="uploadFile";
		
		deleteFileCheckBox.setAttribute("type","checkbox");
		deleteFileCheckBox.id="deleteFile";
		
		row=filePermissionTable.insertRow(filePermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Download";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(downloadFileCheckBox);
		
		row=filePermissionTable.insertRow(filePermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Upload";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(uploadFileCheckBox);
		
		row=filePermissionTable.insertRow(filePermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Delete";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(deleteFileCheckBox);
		
		filePermissionLegend.innerHTML="File access";
		filePermissionFieldSet.appendChild(filePermissionLegend);
		filePermissionFieldSet.appendChild(filePermissionTable);
		
		listFileCheckBox.setAttribute("type","checkbox");
		listFileCheckBox.id="listFile";
		
		createDirCheckBox.setAttribute("type","checkbox");
		createDirCheckBox.id="createDir";
		
		listDirCheckBox.setAttribute("type","checkbox");
		listDirCheckBox.id="listDir";
		
		removeSubDirCheckBox.setAttribute("type","checkbox");
		removeSubDirCheckBox.id="removeSubDir";
		
		denyDirCheckBox.setAttribute("type","checkbox");
		denyDirCheckBox.id="denyDir";
		
		hideDirCheckBox.setAttribute("type","checkbox");
		hideDirCheckBox.id="hideDir";
		
		row=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="List File";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(listFileCheckBox);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Create Sub. Dir.";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(createDirCheckBox);
		
		row=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="List Dir";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(listDirCheckBox);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Remove Sub. Dir.";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(removeSubDirCheckBox);
		
		row=folderPermissionTable.insertRow(folderPermissionTable.rows.length);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Deny";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(denyDirCheckBox);
		cell=row.insertCell(row.cells.length);
		cell.innerHTML="Hide";
		cell=row.insertCell(row.cells.length);
		cell.appendChild(hideDirCheckBox);
		
		folderPermissionLegend.innerHTML="Folder access";
		folderPermissionFieldSet.appendChild(folderPermissionLegend);
		folderPermissionFieldSet.appendChild(folderPermissionTable);
		
	}
}