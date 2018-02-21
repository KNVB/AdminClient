class SelectPhysicalDirBox
{
	constructor(adminServer,physicalDir,userId,accessRightId)
	{
		this.adminServer=adminServer;
		var listItem,linkItem,self=this;
		var upDir=document.createElement("i");
		var dirList=document.createElement("ul");
		var dirListContainer=document.createElement("div");
		var selectDirWrapper=document.createElement("div");
		var selectDirContainer=document.createElement("div");
		var selectedInputBox=document.createElement("input");
		selectDirWrapper.innerHTML="Look in:";
		selectedInputBox.setAttribute("Type","text");
		selectedInputBox.readOnly=true;
		selectedInputBox.value=physicalDir;
		
		upDir.className="fa fa-arrow-circle-up";
		upDir.style.cursor="pointer";
		upDir.style.fontSize="30px";
		upDir.style.color="red";
		upDir.style.verticalAlign="bottom";
		
		dirListContainer.className="dirListContainer";
		dirList.className="dirList";									
		dirList.id='dirList_'+userId+'_'+accessRightId;
		dirListContainer.appendChild(dirList);
		
		var phyicalDirList=[{type:"drive",pathName:"abc"},{type:"folder",pathName:"def"}];
		
		for (var i=0;i<phyicalDirList.length;i++)
		{
			listItem=document.createElement("li");
			listItem.className="directoryItem";
			
			switch(phyicalDirList[i].type)
			{
				case "drive":listItem.innerHTML="<i class=\"fa fa-hdd-o\" style=\"font-size:30px;color:red\"></i>";
										break;
				case "folder":listItem.innerHTML="<i class=\"fa fa-folder\" style=\"font-size:30px;color:red\"></i>";
										break;
			}
			
			listItem.innerHTML+="&nbsp;";
			listItem.style.cursor="pointer";
			listItem.onclick=function()
							{
								self.selectPath(this);
							}
			listItem.onmousedown=function(){return false;};
			linkItem=document.createElement("a");
			linkItem.setAttribute("rel",phyicalDirList[i].pathName);
			linkItem.text=phyicalDirList[i].pathName;
			listItem.appendChild(linkItem);
			dirList.appendChild(listItem);	
		}
		selectDirWrapper.appendChild(selectedInputBox);
		selectDirWrapper.appendChild(upDir);
		selectDirContainer.appendChild(selectDirWrapper);
		selectDirContainer.appendChild(dirListContainer);
		
		
		$.MyModal({
			titleText:"Please select a directory",
			contentText:false,
			contentDom:selectDirContainer,
			showCloseButton:false,
			modalWidth:"400px",
			modalTitleBarClassName:"w3-red",
			buttons:[{
						focus:true,
						class:"w3-red w3-button",
						"text":"Ok",
					}]
		});
	}
	selectPath(item)
	{
		var linkObj=$(item).children("a")[0];
		var dirList=$(item).parent()[0];
		var dirListId=dirList.id.substring(dirList.id.indexOf("_"));
		$(dirList).children("li").removeClass("directoryItemSelected");
		$(item).addClass("directoryItemSelected");
		//var inputBox=document.getElementById("physicalPath"+dirListId);
		//inputBox.value=linkObj.getAttribute("rel");
	}
}
/*
		this.adminServer.getRemoteSubDir(physicalDir,userId,accessRightId);
		this.adminServer.getServerResponse().then(function(serverResponseObj)
													{
														
		
		//this.drillDown(physicalDir,userId,accessRightId);				  
*/
/*
	var listItem,linkItem;
	
	var phyicalDirList=serverResponseObj.returnObjects.dirList;
	
	
	for (var i=0;i<phyicalDirList.length;i++)
	{
		listItem=document.createElement("li");
		listItem.className="directoryItem";
		switch(phyicalDirList[i].type)
		{
			case "drive":listItem.innerHTML="<i class=\"fa fa-hdd-o\" style=\"font-size:30px;color:red\"></i>";
									break;
			case "folder":listItem.innerHTML="<i class=\"fa fa-folder\" style=\"font-size:30px;color:red\"></i>";
									break;
		}
		listItem.innerHTML+="&nbsp;";
		listItem.style.cursor="pointer";
		listItem.onclick=function(){self.selectPath(this);}
		listItem.onmousedown=function(){return false;};
		linkItem=document.createElement("a");
		linkItem.setAttribute("rel",phyicalDirList[i].pathName);
		linkItem.text=phyicalDirList[i].pathName;
		listItem.appendChild(linkItem);
		dirList.appendChild(listItem);	
	}
	$.MyModal({
		titleText:"Please select a directory",
		contentText:false,
		contentDom:dirListContainer,
		showCloseButton:false,
		modalWidth:"400px",
		modalTitleBarClassName:"w3-red",
		buttons:[{
					focus:true,
					class:"w3-red w3-button",
					"text":"Ok",
				}]
	})
	
	
	drillDown(physicalDir,userId,accessRightId)
	{
		
	}	
*/														