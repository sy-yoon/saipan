/***********************************************
 * File Name    : EssenceTool.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : 
***********************************************/
/* Class Define */ 
function EssenceTool()
{
	Tool.call(this);
	this.Rect = new Rect();
	this.isDown = false;
}

EssenceTool.prototype = new Tool();
/******************** Member Method ********************/ 
/* Model Function */
/*
 * Function Name    : mousedown
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
 EssenceTool.prototype.mousedown = function(canvas, event)
 {
	this.Rect.Left = event.offsetX;
	this.Rect.Top = event.offsetY;
	this.isDown = true;
 }

EssenceTool.prototype.mousemove = function(canvas, event) 
{
	if(this.isDown)
	{
		this.Rect.Right = event.offsetX;
		this.Rect.Bottom = event.offsetY;
		this.draw(canvas);	
	}
}


EssenceTool.prototype.mouseup = function (canvas, event)
{
	if(!this.isDown)
		return;

	this.isDown = false;
	this.Rect.Right = event.offsetX;
	this.Rect.Bottom = event.offsetY;
	
	var control = undefined;
	if(canvas.controlType == 'Button')
		control = new Button();
	else if	(canvas.controlType == 'Check')
		control = new Check();
	else if	(canvas.controlType == 'Combo')
		control = new Combo();
	else if	(canvas.controlType == 'TextBox')
		control = new TextBox();
	else if	(canvas.controlType == 'Tree')
		control = new Tree();
	else if	(canvas.controlType == 'Box')
		control = new Box();
	else if	(canvas.controlType == 'Table')
		control = new Table();
	else if	(canvas.controlType == 'Label')
		control = new Label();
	else if	(canvas.controlType == 'Panel')
		control = new Panel();
		
	if(control != undefined){	
		control.Rect.Left = control.Track_Rect.Left = this.Rect.Left;
		control.Rect.Top = control.Track_Rect.Top = this.Rect.Top;
		control.Rect.Right = control.Track_Rect.Right = this.Rect.Right;
		control.Rect.Bottom = control.Track_Rect.Bottom = this.Rect.Bottom;
		control.setDefaultSize();
		var visual = canvas.getVisualByPoint(this.Rect.Left, this.Rect.Top);
		canvas.addVisualObject(visual, control);
		canvas.refresh();
	}
}
 
EssenceTool.prototype.draw = function(canvas)
{
	canvas.refresh(null);	
	var ctx = canvas.Canvas.getContext('2d');
	ctx.strokeStype = "black";
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.stroke();

}
 




