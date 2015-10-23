/***********************************************
 * File Name    : VisualTool.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : 
***********************************************/
/* Class Define */ 
function VisualTool()
{
	Tool.call(this);
	this.PrevPoint = new Point(0,0);
	this.moveVisual = null;
	this.resizeVisual = null;
}

VisualTool.prototype = new Tool();

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
 VisualTool.prototype.mousedown = function(canvas, event)
 {
 	canvas.unSelect();
	var visual = canvas.getVisualByPoint(event.offsetX, event.offsetY);
	if(visual != null)
	{
		this.moveVisual = visual;
		this.moveVisual.trackEnd();
		canvas.select(this.moveVisual);
	}
	this.PrevPoint.X = event.offsetX;
	this.PrevPoint.Y = event.offsetY;
 }

/* Model Function */
/*
 * Function Name    : mousemove
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
VisualTool.prototype.mousemove = function(canvas, event) 
{
	if(this.moveVisual != null)
	{
		//this.moveVisual.move(event.x-this.PrevPoint.X, event.y-this.PrevPoint.Y);
		var visualObjects = canvas.VisualObjects;
		/*for(var i=0; i<visualObjects.length; i++)
		{
			if(visualObjects[i].IsSelected)
				visualObjects[i].move(event.x-this.PrevPoint.X, event.y-this.PrevPoint.Y);
		}*/
		this.moveVisual.move(event.offsetX-this.PrevPoint.X, event.offsetY-this.PrevPoint.Y);
		canvas.refresh();
	}
}

/* Model Function */
/*
 * Function Name    : mouseup
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */ 
VisualTool.prototype.mouseup = function (canvas, event)
{
	if(this.moveVisual != null)
	{
		//canvas.clearRect(this.moveVisual);
		this.moveVisual.trackEnd();
		this.moveVisual = undefined;
	}
	canvas.refresh();
}
 
 




