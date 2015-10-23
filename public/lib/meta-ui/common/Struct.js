/***********************************************
 * File Name    : Struct.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : 
***********************************************/
 
function Point(x,y){
	this.X = x;
	this.Y = y;
}

function Rect(){
	this.Left = 0;
	this.Top = 0;
	this.Right = 0;
	this.Bottom = 0;
}

Rect.prototype.width = function()
{
	return this.Right - this.Left;
}

Rect.prototype.height = function()
{
	return this.Bottom - this.Top;
}




