class LoginSideBar
{
	constructor(loginHandler)
	{
		this.loginSideBar=document.createElement("TABLE");
		this.loginSideBar.className="loginTable";
		this.loginSideBar.id="loginTable";
		var tbody1=document.createElement("TBODY");
		
		var tr1=document.createElement("TR");
		var td1=document.createElement("TD");
		td1.colspan="2";
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
		var loginButton=document.createElement("BUTTON");
		loginButton.id="loginButton";
		loginButton.onclick=function ()
							{
								loginHandler();
							}
		text1=document.createTextNode("Login");
		loginButton.appendChild(text1);
		td1.appendChild(loginButton);
		tr1.appendChild(td1);
		tbody1.appendChild(tr1);
		this.loginSideBar.appendChild(tbody1);
	}
	getDomObj()
	{
		return this.loginSideBar;
	}
}