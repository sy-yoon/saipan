/***********************************************
 * File Name    : EFButton
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function TextBox(){
	Rectangle.call(this);
}


TextBox.prototype = new Rectangle();

/* Model Function */
/*
 * Function Name    : addVisualObject
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2014-08-24
 * Descript         : 
 */
TextBox.prototype.draw = function(ctx)
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

	ctx.lineWidth = 1;
	ctx.strokeStype = "black";
	ctx.fillStyle = "white";
	ctx.fillRect(this.Rect.Left, this.Rect.Top, this.Rect.width(), this.Rect.height());
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.stroke();
	
	
		
	var L_MARGIN = 5;
	var T_MARGIN = 15;
	
	ctx.fillStyle = "black";
	ctx.font="bold 12px Tahoma";
	ctx.fillText('TextBox', this.Rect.Left + L_MARGIN, this.Rect.Top + T_MARGIN);
	
	if(this.IsSelected)
		this.drawBorder(ctx);
} 

TextBox.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}

TextBox.prototype.genExtScript = function(){
	var script = "{\n"
	+"	 xtype : 'textfield'\n"
	+"	,x : "+this.Rect.Left+"\n"
	+"	,y : "+this.Rect.Top+"\n"
	+"	,width : "+this.Rect.width()+"\n"
	+"	,height : "+this.Rect.height()+"\n"
	+"	,fieldLabel : "+singleQuotes(this.Properties['label'])+"\n"
	+"}";
	
	return script;
}

TextBox.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['label'] = '';
}

TextBox.prototype.setDefaultSize = function(){
	this.Rect.Right = this.Rect.Left + 70;
	this.Rect.Bottom = this.Rect.Top + 30;
	
	this.Track_Rect.Right = this.Rect.Right;
    this.Track_Rect.Bottom = this.Rect.Bottom;
}