/***********************************************
 * File Name    : Check
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function Check(){
	Rectangle.call(this);
}

/* DataObject ��� */
Check.prototype = new Rectangle();

Check.prototype.draw = function(ctx)
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

	var boxWidth = 20;
	var boxHeight = 20;
	var rect = new Rect();
	rect.Left = this.Rect.Left;
	rect.Top = this.Rect.Top;
	rect.Right = rect.Left + boxWidth;
	rect.Bottom = rect.Top + boxHeight;
	
	// Draw Box
	ctx.lineWidth = 0.5;
	ctx.strokeStype = "black";
	ctx.fillStyle = "white";
	ctx.fillRect(rect.Left, rect.Top, boxWidth, boxHeight);
	ctx.beginPath();
	ctx.moveTo(rect.Left, rect.Top);
	ctx.lineTo(rect.Right, rect.Top);
	ctx.lineTo(rect.Right, rect.Bottom);
	ctx.lineTo(rect.Left, rect.Bottom);
	ctx.lineTo(rect.Left, rect.Top);
	ctx.stroke();
	
	// Draw Check V
	margin = 3;
	marginTop = 10;
	
	
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.moveTo(rect.Left+margin, rect.Top + marginTop);
	ctx.lineTo(rect.Left+rect.width()/2, rect.Bottom - margin);
	ctx.lineTo(rect.Right - margin, rect.Top + margin);

	ctx.stroke();
	
		
	var L_MARGIN = 5;
	var T_MARGIN = 15;
	
	ctx.fillStyle = "black";
	ctx.font="bold 12px Tahoma";
	ctx.fillText('CheckBox', rect.Right + L_MARGIN, this.Rect.Top + T_MARGIN);
	
	if(this.IsSelected)
		this.drawBorder(ctx);
} 

Check.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}

Check.prototype.genHtml = function(){
	var script = "{\n"
	+"	 xtype : 'checkbox'\n"
	+"	,boxLabel : "+singleQuotes(this.Properties['text'])+"\n"
	+"	,x : "+this.Rect.Left+"\n"
	+"	,y : "+this.Rect.Top+"\n"
	+"	,width : "+this.Rect.width()+"\n"
	+"	,height : "+this.Rect.height()+"\n"
	+"}";
	
	return script;
}

Check.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties["text"] = "CheckBox";
}

Check.prototype.setDefaultSize = function(){
	this.Rect.Right = this.Rect.Left + 80;
	this.Rect.Bottom = this.Rect.Top + 30;
	
	this.Track_Rect.Right = this.Rect.Right;
    this.Track_Rect.Bottom = this.Rect.Bottom;
}