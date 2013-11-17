var Input =
{ 
	bMouseDown : false,
	bMouseInWindow : false,
	bMouseFoundThisTick : false,
	mouseX : 0,
	mouseY : 0,
	deltaMouseX : 0,
	deltaMouseY : 0,
	lastMouseX : 0,
	lastMouseY : 0,
	
	// binds mouse input
	init : function()
	{
		var self = this;
		// jQuery fns
		// blur focus focusin focusout load resize scroll unload click dblclick
		// mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave 
		// change select submit keydown keypress keyup error contextmenu
		
		$("canvas").mousedown(function() {
			self.bMouseFoundThisTick = true;
			self.bMouseDown = true;
		});
		
		$("canvas").mouseup(function(){
			self.bMouseDown = false;
		}).mouseout(function(){
			self.bMouseInWindow = false;
		}).mouseenter(function(){
			self.bMouseFoundThisTick = true;
			self.bMouseInWindow = true;
		});
		
		$( "canvas" ).mousemove(function( event ) {
			self.mouseX = event.clientX;
			self.mouseY = event.clientY;		
		});
	},
	
	// updates mouse state
	tick : function(deltaTime) 
	{
		// deltaTime should be around 17ms, so normalize this around there
		this.deltaMouseX = (this.mouseX - this.lastMouseX) * 17.0 / deltaTime;
		this.deltaMouseY = (this.mouseY - this.lastMouseY) * 17.0 / deltaTime;
			
		// If mouse was just pressed then wait one tick before processing input
		if (this.bMouseFoundThisTick || !this.bMouseDown)
		{
			this.deltaMouseX = 0;
			this.deltaMouseY = 0;
			this.bMouseFoundThisTick = false;
		}
		
		this.lastMouseX = this.mouseX;
		this.lastMouseY = this.mouseY;
	}
}