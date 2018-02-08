class AlertBox extends Dialog
{
	constructor(msg)
	{
		super(msg);
		this.titleBarColor="white";
		this.titleBarBackgroundColor="red";
		this.showCloseButton=false;
		var okButton={text:"Ok",
						  click:function() 
								{
								  $( this ).dialog( "close" );
								},
						};
		this.buttons.push(okButton);
	}
}