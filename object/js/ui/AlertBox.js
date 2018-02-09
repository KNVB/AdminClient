class AlertBox 
{
	constructor(msg)
	{
		$.jAlert({
			'title': false,
			'content': msg,
			'theme': 'red',
			closeBtn:false,
			'btns': { 'text': 'Ok',class:"w3-red"}
		  });
	}
}