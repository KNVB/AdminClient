class LoginSideBar
{
	constructor(adminServer,postLoginHandler)
	{
		var self=this;
		//<!-- Login Side Navigation  -->
		this.loginSideBar=document.createElement("TABLE");
		this.loginSideBar.className="loginTable";
		this.loginSideBar.id="loginTable";
		this.adminServer=adminServer;
		this.postLoginHandler=postLoginHandler;
		var tbody1=document.createElement("TBODY");
		
		var tr1=document.createElement("TR");
		var td1=document.createElement("TD");
		td1.colSpan="2";
		td1.align="center";
		var text1=document.createTextNode("Admin. Server login");
		td1.appendChild(text1);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		
		tr1=document.createElement("TR");
		td1=document.createElement("TD");
		td1.className="loginCaption";
		text1=document.createTextNode("server name:");
		td1.appendChild(text1);
		tr1.appendChild(td1);
		td1=document.createElement("TD");
		var hostName=document.createElement("INPUT");
		hostName.type="text";
		hostName.value="localhost";
		hostName.id="hostName";
		hostName.size="10";
		hostName.required=true;
		td1.appendChild(hostName);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		
		tr1=document.createElement("TR");
		td1=document.createElement("TD");
		td1.className="loginCaption";
		text1=document.createTextNode("server port no:");
		td1.appendChild(text1);
		tr1.appendChild(td1);
		td1=document.createElement("TD");
		var portNo=document.createElement("INPUT");
		portNo.type="number";
		portNo.value="4466";
		portNo.id="portNo";
		portNo.min="1";
		portNo.max="999999";
		portNo.required=true;
		td1.appendChild(portNo);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		
		tr1=document.createElement("TR");
		td1=document.createElement("TD");
		td1.className="loginCaption";
		text1=document.createTextNode("user name:");
		td1.appendChild(text1);
		tr1.appendChild(td1);
		td1=document.createElement("TD");
		var userName=document.createElement("INPUT");
		userName.type="text";
		userName.value="admin";
		userName.id="userName";
		userName.size="10";
		userName.required=true;
		td1.appendChild(userName);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		
		tr1=document.createElement("TR");
		td1=document.createElement("TD");
		td1.className="loginCaption";
		text1=document.createTextNode("password:");
		td1.appendChild(text1);
		tr1.appendChild(td1);
		td1=document.createElement("TD");
		var password=document.createElement("INPUT");
		password.type="password";
		password.value="password";
		password.id="password";
		password.size="10";
		password.required=true;
		td1.appendChild(password);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		
		tr1=document.createElement("TR");
		td1=document.createElement("TD");
		td1.colSpan="2";
		td1.style="text-align:center;";
		var loginButton=document.createElement("span");
		loginButton.id="loginButton";
		loginButton.className="w3-btn w3-red w3-border w3-border-white w3-round-xxlarge";
		loginButton.onclick=function ()
							{
								self.connect(hostName.value,portNo.value,userName.value,password.value);
							}
		text1=document.createTextNode("Login");
		loginButton.appendChild(text1);
		td1.appendChild(loginButton);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		this.loginSideBar.appendChild(tbody1);
		
	}
	connect(hostName,portNo,userName,password)
	{
		var self=this;
		var errorMsg="";
		if ($.trim(hostName)=="")
			errorMsg="Please enter host name<br>";
		if ($.trim(portNo)=="")
		{	
			errorMsg+="Please enter port no.<br>";
		}
		else
		{
			if (isNaN(portNo))
				errorMsg+="Please a valid port no.(0-65535)<br>";
			else
				if ((portNo<0) || (portNo>65535))
					errorMsg+="Please an valid port no.(0-65535)<br>";
		}
		if ($.trim(userName)=="")
			errorMsg+="Please enter user name<br>";
		if ($.trim(password)=="")
			errorMsg+="Please enter password<br>";
		if (errorMsg!="")
		{
			var alertBox=new AlertBox(errorMsg);
		}
		else
		{
			var url="ws://"+$.trim(hostName)+":"+portNo+"/websocket";
			console.log("url:"+url);
			$.loadingBlockShow();
			this.adminServer.connect(url).then(function ()
												{
													self.adminServer.login(userName,password,self.processLoginResult.bind(self));
												},
												function(errorMsg)
												{
													self.adminServer.disConnect();
													this.loginProgressDiv.style.display="none";
													var alertBox=new AlertBox(errorMsg);
												});
		}
	}
	processLoginResult(loginResultObj)
	{
		var self=this;
		if (loginResultObj.responseCode==0)
		{
			$.loadingBlockHide();
			this.hide().then(function()
							{
								self.postLoginHandler();
							});
		}
		else
		{
			self.adminServer.disConnect();
			var alertBox=new AlertBox("Invalid Admin. user name or password.");
			alertBox.title="Error";
			alertBox.show();
		}
	}		
	hide()
	{
		var self=this;
		return new Promise(function(resolve, reject)
		{
			$(self.loginSideBar).hide("slide",{},500,resolve);
		});		
	}
	
	getDomObj()
	{
		var domObjList=new Array();
		domObjList.push(this.loginSideBar);
		return domObjList;
	}
}