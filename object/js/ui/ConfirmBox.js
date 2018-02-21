class ConfirmBox
{
	constructor(questionText)
	{
		var defer = $.Deferred();
		var options={
						titleText:"Confirm",
						modalTitleBarClassName:"w3-red",
						backgroundColor:"black",
						contentText:questionText,
						showCloseButton:false,
						buttons:[
								{
									focus:true,
									class:"w3-red w3-button",
									"text":"No",
									"handler":function()
										{
											defer.resolve(false);
										}
								},
								{
									focus:false,
									class:"w3-red w3-button",
									"text":"Yes",
									"handler":function()
											{
												defer.resolve(true);
											}
								}],		
					}
		$.MyModal(options);
		return defer.promise();	
	}
	
}