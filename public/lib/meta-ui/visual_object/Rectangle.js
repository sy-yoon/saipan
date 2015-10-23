/***********************************************
 * File Name    : Rectangle.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : 
***********************************************/
 
function Rectangle(){
	VisualObject.call(this);
	
	this.Rect = new Rect();
	this.Track_Rect = new Rect();
	this.HandleCount = 8;
	this.FillStyle = "white";
	this.Properties = {};
	this.initProperties();
}


Rectangle.prototype = new VisualObject();

Rectangle.prototype.draw = function(ctx){	
	ctx.restore();	
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.stroke();
} 

Rectangle.prototype.drawBorder = function(ctx){
	ctx.beginPath();
	ctx.strokeStyle = '#ff0000';
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.lineWidth = 4;
	ctx.stroke();	
} 

Rectangle.prototype.trackDraw = function(ctx){
	ctx.restore();
	ctx.beginPath();
	ctx.moveTo(this.Track_Rect.Left, this.Track_Rect.Top);
	ctx.lineTo(this.Track_Rect.Right, this.Track_Rect.Top);
	ctx.lineTo(this.Track_Rect.Right, this.Track_Rect.Bottom);
	ctx.lineTo(this.Track_Rect.Left, this.Track_Rect.Bottom);
	ctx.lineTo(this.Track_Rect.Left, this.Track_Rect.Top);
	ctx.lineWidth = 1;
	ctx.stroke();
}  

/*
 * Function Name    : makeHitTest
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
Rectangle.prototype.makeHitTest = function(point)
{
	/*if (IsSelected)
    {
        for (int i = 1; i <= HandleCount; i++)
        {
            if (GetHandleRectangle(i).Contains(point))
                return i;
        }
    }*/

    if (this.contains(point))
        return 0;
	return -1;
}

/*
 * Function Name    : makeHitTest
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
Rectangle.prototype.contains = function(point)
{
	if( (this.Rect.Left < point.X && point.X < this.Rect.Right) &&
		(this.Rect.Top < point.Y && point.Y < this.Rect.Bottom) )
			return true;
	return false;
}

Rectangle.prototype.move = function(x, y)
{
	this.Track_Rect.Left = this.Rect.Left + x;
    this.Track_Rect.Right= this.Rect.Right + x;
    this.Track_Rect.Top = this.Rect.Top + y;
    this.Track_Rect.Bottom = this.Rect.Bottom + y;
}

Rectangle.prototype.trackEnd = function()
{
	this.Rect.Left = this.Track_Rect.Left;
    this.Rect.Right= this.Track_Rect.Right;
    this.Rect.Top = this.Track_Rect.Top;
    this.Rect.Bottom = this.Track_Rect.Bottom;
}

	
Rectangle.prototype.makePrptSource = function(){
	var properties = [];
	
	for(var index in this.Properties){
		properties.push({
			name : index,
			type : 'text',
			value : this.Properties[index]
		});
	}
	
	properties.push({
		name : 'left',
		type : 'text',
		value : this.Rect.Left
	});
	
	properties.push({
		name : 'top',
		type : 'text',
		value : this.Rect.Top
	});
	
	properties.push({
		name : 'width',
		type : 'text',
		value : this.Rect.width()
	});
	
	properties.push({
		name : 'height',
		type : 'text',
		value : this.Rect.height()
	});
	
	return properties;
}

Rectangle.prototype.updateSource = function(propertyId, propertyVal){
	if(propertyId == 'left'){
		this.Track_Rect.Right = parseInt(propertyVal) + this.Track_Rect.width();
		this.Track_Rect.Left = parseInt(propertyVal);	
		this.trackEnd();
	}else if(propertyId == 'top'){
		this.Track_Rect.Bottom = parseInt(propertyVal) + this.Track_Rect.height();
		this.Track_Rect.Top = parseInt(propertyVal);
		this.trackEnd();
	}else if(propertyId == 'width'){
		this.Track_Rect.Right = this.Track_Rect.Left + parseInt(propertyVal);
		this.trackEnd();
	}else if(propertyId == 'height'){
		this.Track_Rect.Bottom = this.Track_Rect.Top + parseInt(propertyVal);
		this.trackEnd();
	}
}

Rectangle.prototype.initProperties = function(){
	this.Properties["id"] = undefined;
}


Rectangle.prototype.genScript = function(){
	var script = "";
	return script;
}