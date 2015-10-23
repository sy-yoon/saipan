/***********************************************
 * File Name    : Button
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function Button(){
	Rectangle.call(this);
	 
}

/* DataObject ��� */
Button.prototype = new Rectangle();

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
Button.prototype.draw = function(ctx)
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
	ctx.fillStyle = 'grey';
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
	ctx.fillText(this.Properties['text'], this.Rect.Left + L_MARGIN, this.Rect.Top + T_MARGIN);
	
	if(this.IsSelected)
		this.drawBorder(ctx);
	
} 

Button.prototype.updateSource = function(propertyId, propertyVal){ 
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
	
	this.Properties[propertyId] = propertyVal;
	
}

Button.prototype.genHtml = function(){
	var script = 
	"<button class='#{class}' style='position:absolute; left:#{left}; top:#{top};' ng-click='#{id}_click()'>"
	+ this.Properties['text']
	+"</button>";
	
	script = script.replace('#{class}',this.Properties['class']);
	script = script.replace('#{left}', this.Rect.Left + 'px');
	script = script.replace('#{top}', this.Rect.Top + 'px');
	script  = script.replace('#{id}',this.Properties['id']);
	return script;
}

Button.prototype.genScript = function(){
	var script = "$scope.#{id}_click = function(){\n"
	+ this.Properties['click']	
	+"}\n";
	
	script  = script.replace('#{id}',this.Properties['id']);
	return script;
}

Button.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['text'] = 'Button';
	this.Properties['class'] = 'btn btn-default';
	this.Properties['click'] = '';
	
	
}

Button.prototype.setDefaultSize = function(){
	this.Rect.Right = this.Rect.Left + 70;
	this.Rect.Bottom = this.Rect.Top + 30;
	
	this.Track_Rect.Right = this.Rect.Right;
    this.Track_Rect.Bottom = this.Rect.Bottom;
}