class ConfirmBox
{
	constructor(questionText)
	{
		var defer = $.Deferred();
		$.jAlert({
				'title': false,
				"type":"confirm",
				"content":questionText,
				"confirmQuestion":questionText,
				"confirmBtnText":"Yes",
				"denyBtnText":"No",
				"closeBtn":false,
				"confirmAutofocus":'.denyBtn',
				onConfirm:function()
							{
								defer.resolve(true);
							},
				onDeny:function()
						{	
							defer.resolve(false);
						}
			});
		$(".confirmBtn")[0].className+=" w3-red";
		$(".denyBtn")[0].className+=" w3-red";
		return defer.promise();	
	}
	
}