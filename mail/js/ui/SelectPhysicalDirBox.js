class SelectPhysicalDirBox
{
	constructor(adminServer,physicalDir,userId,accessRightId)
	{
		this.adminServer=adminServer;
		
		var upDir=document.createElement("i");
		
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
		selectDirWrapper.className="selectDirWrapper";
		selectDirWrapper.appendChild(selectedInputBox);
		selectDirWrapper.appendChild(upDir);
		selectDirContainer.appendChild(selectDirWrapper);
		dirListContainer.appendChild(selectDirContainer);
		
		var physicalDirList=[{type:"drive",pathName:"abc"},{type:"folder",pathName:"def"}];
		var dirListId='dirList_'+userId+'_'+accessRightId;
		dirListContainer.appendChild(this.buildDirList(dirListId,physicalDirList));
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
		});
	}
	selectPath(item)
	{
		var dirList=$(item).parents("ul.dirList");
		$(dirList).find("li >a").removeClass("directoryItemSelected");
		$(item).addClass("directoryItemSelected");
	}
	drillDown(item)
	{
		var topDirList=$(item).parents("ul[id!='']");
		var pDirList=[{type:"folder",pathName:"一二三"},{type:"folder",pathName:"四五六"}];
		console.log(item);
		//topDirList.find("li>ul").hide(1000);
		if ($(item).next("ul").length==0)
		{
			var dirList=this.buildDirList("",pDirList);
			$(dirList).hide();
			$(dirList).insertAfter(item);
		}
		$(item).next("ul").toggle(1000);
		$(item).removeClass("directoryItemSelected");
	}
	buildDirList(dirListId,physicalDirList)
	{
		var listItem,linkItem,icon,self=this;
		var dirList=document.createElement("ul");
		dirList.className="dirList";
		if ((dirListId!=null) && ($.trim(dirListId)!=""))
		{
			dirList.id=dirListId;
			dirList.className+=" topDirList";
		}
		for (var i=0;i<physicalDirList.length;i++)
		{
			listItem=document.createElement("li");
			linkItem=document.createElement("a");
			icon=document.createElement("i");
			icon.innerHTML="&nbsp;";
			switch(physicalDirList[i].type)
			{
				case "drive":icon.className="fa fa-hdd-o";
										break;
				case "folder":icon.className="fa fa-folder";
										break;
			}
			icon.setAttribute("style","font-size:30px;color:red");
			linkItem.style.display="block";
			listItem.className="directoryItem";
			linkItem.setAttribute("rel",physicalDirList[i].pathName);
			linkItem.appendChild(icon);
			linkItem.innerHTML+=physicalDirList[i].pathName;
			linkItem.style.cursor="pointer";
			linkItem.onmousedown=function(){return false;};
		/*	linkItem.onclick=function()
							{
								self.selectPath(this);
							}*/
			linkItem.ondblclick=function()
							{
								self.drillDown(this);
								self.selectPath(this);
							}
			listItem.appendChild(linkItem);
			dirList.appendChild(listItem);
		}
		return dirList;
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