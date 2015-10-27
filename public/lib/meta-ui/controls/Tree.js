/***********************************************
 * File Name    : Tree
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function Tree(){
	Rectangle.call(this);
	this.Type = 'Tree'; 
}

Tree.prototype = new Rectangle();

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
Tree.prototype.draw = function(ctx)
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
	
			
	var L_MARGIN = 5;
	var T_MARGIN = 15;
	
	ctx.fillStyle = "black";
	ctx.font="bold 12px Tahoma";
	ctx.fillText('Tree', this.Rect.Left + L_MARGIN, this.Rect.Top + T_MARGIN);
	
	if(this.IsSelected)
		this.drawBorder(ctx);
} 

Tree.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
}

Tree.prototype.genHtml = function(){
	var script = "{\n"
	+"	 xtype : 'treepanel'\n"
	+"	,x : "+this.Rect.Left+"\n"
	+"	,y : "+this.Rect.Top+"\n"
	+"	,width : "+this.Rect.width()+"\n"
	+"	,height : "+this.Rect.height()+"\n";
	if(this.Properties['datasource'].length > 0){
		script +="	,store : me."+this.Properties['datasource']+"\n"	
	}
	script +="	,columns : {items : ["+this.genExtColumnScript()+"]}\n"
	+"}";
	
	return script;
}

Tree.prototype.genExtColumnScript = function(){
	var script = '';
	if(this.Properties['columns'].length > 0){
		for(var i=0; i<this.Properties['columns'].length; i++){
			if (i != 0)
			script += ",";
			var col = "{	 text : "+singleQuotes(this.Properties['columns'][i].text) + "\n"
						+"	,width : "+this.Properties['columns'][i].width+"\n"
						+"	,dataIndex : '"+this.Properties['columns'][i].dataIndex+"'\n"
						+"}";
			script += col;
		}
		
	}
	return script;
}

Tree.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['columns'] = [];
	this.Properties['datasource']='';
}