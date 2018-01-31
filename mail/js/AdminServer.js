const WsStateDisconnected = 0;
const WsStateDisconnecting = 1;
const WsStateConnected = 2;
const WsStateConnecting = 3;
class AdminServer
{
	constructor(url)
	{
		this.url=url;
		this.ws = null;
		this.messageCoder;
		this.wsState = WsStateDisconnected;
	}
	
	connect()
	{
		this.wsState = WsStateConnecting;
		this.ws = new WebSocket(this.url);
		this.ws.onopen = function (e) {
	        this.wsState = WsStateConnected;
	        if (this.wsState === WsStateConnected) {
	          this.sendPublicKey();
			  this.initCoder().then(function()
									{
										if (self.messageCoder!=null)
											console.log("Initialize messageCoder successfully");
										else
											console.log("Initialize messageCoder failed.");
									});		
	        } else {
	          console.log('connection is closed or closing')
	        }
	      }.bind(this);
		this.ws.onerror = function (e) {
	          // TODO
	          this.errorHandler(e);
	        }.bind(this);  
	}
	errorHandler(evt)
	{
		alert(evt.type);
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
		this.keyCoder.getKey();
		//console.log("Public key="+keyCoder.getPublicKey());
		var publicKey=this.keyCoder.getPublicKey();
		publicKey=publicKey.replace("-----BEGIN PUBLIC KEY-----\n","");
		publicKey=publicKey.replace("\n-----END PUBLIC KEY-----","");
		console.log("Public key="+publicKey);
		this.ws.send(publicKey);
		this.keyCoder.setPrivateKey(this.keyCoder.getPrivateKey());
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
				$(self.serverResponse).val($(self.serverResponse).val()+"decoded AES key="+decodedServerResponseMessage+"\n");
				var aesKey=JSON.parse(decodedServerResponseMessage);
				self.messageCoder=new MessageCoder(aesKey.messageKey,aesKey.ivText);
				resolve();
			}
		})
	}
	getServerResponse()
	{
		var self=this;
		return new Promise((resolve, reject) =>{
				self.ws.onmessage = (e) =>{
					var serverResponseMessage = e.data;
					resolve(self.messageCoder.decode(serverResponseMessage));
				}
			});
	}	
}