/***********************************************
 * File Name    : Box
 * Author       : sukyong, yoon
 * Date         : 2015-10-24
 * Descript     : 
***********************************************/
 
function Box(){
	Rectangle.call(this);
	this.Type = 'Box'; 
}

Box.prototype = new Rectangle();


Box.prototype.draw = function(ctx)
{
	ctx.restore();
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.clip();
	
	var HEADER_HEIGHT = 50;
	var FOOTER_HEIGHT = 50;
	
	ctx.fillStyle = "white";
	ctx.fillRect(this.Rect.Left, this.Rect.Top, this.Rect.width(), this.Rect.height());
	
	if(this.Properties['ShowHeader'] == true){
		ctx.fillStyle = '#F0F0F0';
		ctx.fillRect(this.Rect.Left, this.Rect.Top, this.Rect.width(), HEADER_HEIGHT );	
	}
	
	
	
	if(this.Properties['ShowFooter'] == true){
		ctx.fillStyle = '#F0F0F0';
		ctx.fillRect(this.Rect.Left, this.Rect.Bottom + FOOTER_HEIGHT, this.Rect.width(), HEADER_HEIGHT );	
	}
	
		
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.stroke();
	
	if(this.IsSelected)
		this.drawBorder(ctx);
	
} 

Box.prototype.updateSource = function(propertyId, propertyVal){ 
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}


Box.prototype.genHtml = function(){
	var script = "<div class='box'>"
	+ this.Properties['text']
	+"</div>";
	
	return script;
}

Box.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties["text"] = "Button";
}