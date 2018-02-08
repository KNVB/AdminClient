class AlertBox extends Dialog
{
	constructor(msg)
	{
		super(msg);
		this.titleBarColor="white";
		this.titleBarBackgroundColor="red";
		this.showCloseButton=false;
		var okButton={
						class:"w3-red",
						text:"Ok",
						click:function() 
								{
								  $( this ).dialog( "close" );
								},
						};
		this.buttons.push(okButton);
	}
}