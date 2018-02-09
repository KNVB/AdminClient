const WsStateDisconnected = 0;
const WsStateDisconnecting = 1;
const WsStateConnected = 2;
const WsStateConnecting = 3;
class AdminServer
{
	constructor()
	{
		this.ws = null;
		this.messageCoder=null;
		this.wsState = WsStateDisconnected;
	}
	connect(url)
	{
		var self=this;
		this.url=url;
		this.wsState = WsStateConnecting;
		this.ws = new WebSocket(this.url);
		return new Promise((resolve, reject) => {
			self.ws.onerror = function (e)
							{
								reject("Connection to Admin. Server failure.");
							}								
			self.ws.onopen = (e)=> {
					console.log("connection opened at:"+new Date());
					self.wsState = WsStateConnected;
					if (this.wsState === WsStateConnected) 
					{ 
						self.sendPublicKey();
						this.initCoder().then(function()
											{
												resolve();
											},
											function ()
											{
												reject("Init Message Coder failure");
											});
					}
					else 
					{
						reject('connection is closed or closing');
					}
				}			
		});	
	}
	errorHandler(evt)
	{
		alert(evt);
	}
	disConnect()
	{
	      //this.setreconnect(false);
	      if (this.ws !== null) {
	        if (this.wsState === WsStateConnected) {
	          this.wsState = WsStateDisconnecting;
	          this.ws.close();
	        } else {
	          console.log('connection is not complete');
	        }
	      } else {
	        console.log('WebSocket session is null');
	      }
	}
	// virtual function
	sendPublicKey() 
    {
		var dt = new Date();
		var time = -(dt.getTime());
		this.keyCoder = new JSEncrypt({
						default_key_size: 2048
					});
		this.keyCoder.getKey();
		//console.log("Public key="+keyCoder.getPublicKey());
		var publicKey=this.keyCoder.getPublicKey();
		publicKey=publicKey.replace("-----BEGIN PUBLIC KEY-----\n","");
		publicKey=publicKey.replace("\n-----END PUBLIC KEY-----","");
		console.log("Public key="+publicKey);
		this.ws.send(publicKey);
		this.keyCoder.setPrivateKey(this.keyCoder.getPrivateKey());
    }
	login(userName,password,callBack)
	{
		this.sendRequestObj(new Login(userName,password),callBack);
	}
	sendRequestObj(obj,callBack)
	{
		this.sendMessage(JSON.stringify(obj),callBack);
	}
	sendMessage(message,callBack)
	{
		var self=this;
		if (this.wsState === WsStateConnected) 
		{
			this.ws.send(this.messageCoder.encode(message));
			$(this.status).val($(this.status).val()+"Message="+message+" sent\n");
			this.getServerResponse().then(function(data)
											{
												callBack(data);
											});											
		}
		else
			console.log('connection is closed or closing');
	}
	initCoder()
	{
		var self=this;
		return new Promise((resolve, reject) => {
			self.ws.onmessage = (e) => {
				console.log("Server responsed received at:"+new Date());	
				var serverResponseMessage = e.data;
				var decodedServerResponseMessage = self.keyCoder.decrypt(serverResponseMessage);
				console.log("decoded AES key="+decodedServerResponseMessage+"\n");
				var aesKey=JSON.parse(decodedServerResponseMessage);
				self.messageCoder=new MessageCoder(aesKey.messageKey,aesKey.ivText);
				if (self.messageCoder!=null)
					resolve();
				else
					reject();
			}
		})
	}
	getServerResponse()
	{
		var self=this;
		return new Promise((resolve, reject) =>{
				self.ws.onmessage = (e) =>{
					var serverResponseMessage = e.data;
					resolve(JSON.parse(self.messageCoder.decode(serverResponseMessage)));
				}
			});
	}	
}