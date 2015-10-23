/***********************************************
 * File Name    : Combo
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function Combo(){
	Rectangle.call(this);
}

/* DataObject ��� */
Combo.prototype = new Rectangle();

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
Combo.prototype.draw = function(ctx)
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

	ctx.lineWidth = 0.5;
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
	
	// Draw Button
	var btnWidth = 20;
	var btnHeight = 20;
	
	var rect = new Rect();
	margin = 5;
	rect.Left = this.Rect.Right - btnWidth  + margin;
	rect.Top = this.Rect.Top + margin;
	rect.Right = this.Rect.Right - margin;
	rect.Bottom = this.Rect.Bottom - margin;

	//ctx.rect(rect.Left, rect.Top, rect.width(), rect.height());
	
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.moveTo(rect.Left, rect.Top);
	ctx.lineTo(rect.Right, rect.Top);
	ctx.lineTo(rect.Left + rect.width()/2, rect.Bottom);
	ctx.lineTo(rect.Left, rect.Top)
	ctx.fill();
	ctx.stroke();
	
	
		
	var L_MARGIN = 5;
	var T_MARGIN = 15;
	
	ctx.fillStyle = "black";
	ctx.font="bold 12px Tahoma";
	ctx.fillText('Combo', this.Rect.Left + L_MARGIN, this.Rect.Top + T_MARGIN);
	
	if(this.IsSelected)
		this.drawBorder(ctx);
} 

Combo.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}

Combo.prototype.genHtml = function(){
	var script = 
	"<select style='position:absolute; left:#{left}; top:#{top}; width:#{width}'>"
	+"</select>"
	
	script = script.replace('#{left}', this.Rect.Left + 'px');
	script = script.replace('#{top}', this.Rect.Top + 'px');
	script = script.replace('#{width}', this.Rect.width() + 'px');
	return script;
}

Combo.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['label'] = '';
	this.Properties['id'] = 'Btn_1';
}

Combo.prototype.setDefaultSize = function(){
	this.Rect.Right = this.Rect.Left + 100;
	this.Rect.Bottom = this.Rect.Top + 30;
	
	this.Track_Rect.Right = this.Rect.Right;
    this.Track_Rect.Bottom = this.Rect.Bottom;
}