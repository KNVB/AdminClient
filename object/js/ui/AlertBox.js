class AlertBox 
{
	constructor(msg)
	{
		/*$.jAlert({
			'title': false,
			'content': msg,
			'theme': 'red',
			closeBtn:false,
			'btns': { 'text': 'Ok',class:"w3-red"}
		  });*/
		  
		var options={
						titleText:"Alert",
						modalTitleBarClassName:"w3-red",
						backgroundColor:"black",
						contentText:msg,
						showCloseButton:false,
						buttons:[{
									focus:true,
									class:"w3-red w3-button",
									"text":"Ok",
								}]
					}
		$.MyModal(options);  
	}
}