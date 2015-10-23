/***********************************************
 * File Name    : Panel
 * Author       : sukyong, yoon
 * Date         : 2015-10-24
 * Descript     : 
***********************************************/
 
function Panel(){
	Rectangle.call(this);
	this.children = []; 
}

Panel.prototype = new Rectangle();


Panel.prototype.draw = function(ctx)
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
	
	for(i in this.children){
		this.children[i].draw(ctx);
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

Panel.prototype.updateSource = function(propertyId, propertyVal){ 
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}


Panel.prototype.genHtml = function(){
	var script = 
	"<div style='position:absolute'>"
	+ this.genContentHtml()
	+"</div>";
	
	return script;
}

Panel.prototype.genContentHtml = function() {
	var script = "";
	
	for (var i = 0; i < this.children.length; i++) {
		script += this.children[i].genHtml();
	}
	return script;
}

Panel.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['id'] = 'Panel_1';
}


Panel.prototype.move = function(x, y)
{
	this.Track_Rect.Left = this.Rect.Left + x;
    this.Track_Rect.Right= this.Rect.Right + x;
    this.Track_Rect.Top = this.Rect.Top + y;
    this.Track_Rect.Bottom = this.Rect.Bottom + y;
	
	for(i in this.children){
		this.children[i].move(x,y);
	}
	
	
}

Panel.prototype.trackDraw = function(ctx){
	ctx.restore();
	ctx.beginPath();
	ctx.moveTo(this.Track_Rect.Left, this.Track_Rect.Top);
	ctx.lineTo(this.Track_Rect.Right, this.Track_Rect.Top);
	ctx.lineTo(this.Track_Rect.Right, this.Track_Rect.Bottom);
	ctx.lineTo(this.Track_Rect.Left, this.Track_Rect.Bottom);
	ctx.lineTo(this.Track_Rect.Left, this.Track_Rect.Top);
	ctx.lineWidth = 1;
	ctx.stroke();
	
	for(i in this.children){
		this.children[i].trackDraw(ctx);
	}
}  


Panel.prototype.trackEnd = function()
{
	this.Rect.Left = this.Track_Rect.Left;
    this.Rect.Right= this.Track_Rect.Right;
    this.Rect.Top = this.Track_Rect.Top;
    this.Rect.Bottom = this.Track_Rect.Bottom;
	
	for(i in this.children){
		this.children[i].trackEnd();
	}
}
