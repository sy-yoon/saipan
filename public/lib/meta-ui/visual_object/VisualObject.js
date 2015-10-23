/***********************************************
 * File Name    : VisualObject.js
 * Author       : sukyong, yoon
 * Date         : 2012-02-24
 * Descript     : Essence, Attribute��  (Base)Visual Object 
 ***********************************************/

function VisualObject() {
	/* Location Info */
	this.Id = Lib.getGUID();
	this.Type = 0;
	this.StrokeStype = "black";
	this.FontSize = 10;
	this.LineWidth = 1;
	this.IsSelected = false;
}

VisualObject.prototype = {
}

/* Model Function */
/*
 * Function Name    : addVisualObject
 * Parameter        : 
 * Parameter        : 
 * Return Type      : int
 * Author           : sukyong, yoon
 * Date             : 2012-02-24
 * Descript         : 
 */
VisualObject.prototype.draw = function(dc) {
}

VisualObject.prototype.makeHitTest = function(point) {
	return -1;
}

VisualObject.prototype.move = function(x, y) {
}

VisualObject.prototype.setDefaultSize = function(){
}
