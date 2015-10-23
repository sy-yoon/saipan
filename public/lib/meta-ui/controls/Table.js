/***********************************************
 * File Name    : Table
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function Table(){
	Rectangle.call(this);
}

Table.prototype = new Rectangle();

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
Table.prototype.draw = function(ctx)
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
		
	var HEADER_HEIGHT = 50;
	var FOOTER_HEIGHT = 50;
	var T_MARGIN = 20;
	
	ctx.fillStyle = "white";
	ctx.fillRect(this.Rect.Left, this.Rect.Top, this.Rect.width(), this.Rect.height());
	
	if(this.Properties['showHeader'] == true){
		ctx.fillStyle = '#F0F0F0';
		ctx.fillRect(this.Rect.Left, this.Rect.Top, this.Rect.width(), HEADER_HEIGHT );	
	}
	
	if(this.Properties['showFooter'] == true){
		ctx.fillStyle = '#F0F0F0';
		ctx.fillRect(this.Rect.Left, this.Rect.Bottom + FOOTER_HEIGHT, this.Rect.width(), HEADER_HEIGHT );
		
		if(this.Properties['usePaging'] == true){
			
		}
	}
	
	//Draw Columns
	if(this.Properties['header'].length > 0){
		ctx.fillStyle = "black";
		ctx.textAlign = 'center';
		ctx.font="bold 12px Tahoma";
		var left = this.Rect.Left;
		for(var i=0; i<this.Properties['header'].length; i++){
			//this.Properties.Columns[i].
			ctx.fillText(this.Properties['header'][i].label, left + this.Properties['header'][i].width/2, this.Rect.Top + T_MARGIN);
			left += this.Properties['header'][i].width;
		}
	}
	
	ctx.lineWidth = 0.5;
	ctx.beginPath();
	ctx.moveTo(this.Rect.Left, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Top);
	ctx.lineTo(this.Rect.Right, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Bottom);
	ctx.lineTo(this.Rect.Left, this.Rect.Top);
	ctx.stroke();
	
	if(this.IsSelected)
		this.drawBorder(ctx);
} 

Table.prototype.makePrptSource = function(){
	
	var properties = Rectangle.prototype.makePrptSource.call(this);	
	
	for(var i in properties){
		if(properties[i].name == 'header'){
			properties[i].type = 'button';
		}
		
		if(properties[i].name == 'datasource'){
			properties[i].type = 'button';
		}
	}
	return properties;
}


Table.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
	this.Properties[propertyId] = propertyVal;
}



Table.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['header'] = [];
	this.Properties['datasource'] ='';
	this.Properties['showHeader'] = true;
	this.Properties['showFooter'] = true;
	this.Properties['usePaging'] = true;
	this.Properties['class'] = 'table table-hover';
}

Table.prototype.genHtml = function(){
	var script = 
	"<div style='position:absolute; left:#{left}; top:#{top};'>"
	+""
	+"	<div class='box'>"
	+"		<div class='box-body table-responsive no-padding' style='width:#{width};height:#{height};'>"
	+"			<table class='#{class}'>"
	+"				<thead>"
	+"					<th ng-repeat='item in pageMeta.objects.#{id}.properties.header'>{{item.label}}</th>"
	+"				</thead>"
	+"				<tbody>"
	+"					<tr ng-repeat='item in #{id}_#{datasource}'>"
	+"						<td ng-repeat='h_item in pageMeta.objects.#{id}.properties.header'>"
	+"							<a href='#dbms/procedure?dbmsId={{item.DBMS_ID}}&schemaId={{item.SCHEMA_ID}}&procedureNm={{item.MBR_OBJ_NM}}' ng-if='h_item.HREF'>{{item[h_item.field]}}</a>"
	+"							<span ng-if='h_item.href == undefined'>{{item[h_item.field]}}</span>"
	+"						</td>"
	+"					</tr>"	
	+"				</tbody>"
	+"			</table>"
	+"		</div>"
	+"		<div class='box-footer text-center'>"
	+"			<label>Total Items : {{#{id}.totalCount}}</label>"
	+"			<div class='box-tools pull-right'>"
	+"				<button class='btn btn-default btn-sm' ng-click='#{id}.prev(this);'>"
	+"					<i class='fa fa-chevron-left'></i>"
	+"				</button>"
	+"				{{#{id}.pageNum}}/{{#{id}.totalPage}}"
	+"				<button class='btn btn-default btn-sm' ng-click='#{id}.next(this);'>"
	+"					<i class='fa fa-chevron-right'></i>"
	+"				</button>"
	+"			</div>"
	+"		</div>"
	+"	</div>"
	+"</div>";
	
	
	script = script.replace(/#{id}/g, this.Properties['id']);
	script = script.replace('#{class}',this.Properties['class']);
	script = script.replace('#{left}', this.Rect.Left + 'px');
	script = script.replace('#{top}', this.Rect.Top + 'px');
	script = script.replace('#{width}', this.Rect.width() + 'px');
	script = script.replace('#{height}', this.Rect.height() + 'px');
	script = script.replace('#{datasource}',this.Properties['datasource']);
	return script;
}
				

Table.prototype.genScript = function(){
	var script = 
	"$scope.#{id} = {\n"
    +"   pageNum: 0,\n"
    +"   totalPage: 0,\n"
    +"   totalCount: 0,\n"
    +"   loadCnt: function(scope, params){\n"
	+"			   var me = this;\n"
	+"	           params = angular.extend(scope.getDatasource(scope.pageMeta, '#{datasource}'));\n"
	+"			   params.method = 'count'\n"				
	+"			   scope.loadDs(params, function (data) {\n"
	+"					if (data.count) {\n"
	+"							 me.totalCount = data.count;\n"
	+"							 if (me.totalCount > 0) {\n"
	+"							 	 me.pageNum = 1;\n"
	+"								 me.totalPage = Math.ceil(me.totalCount / scope.app_config.table_entries);\n"
	+"								 me.load(scope,{});\n"
	+"							}\n"
	+"					}\n"
	+"			});\n"
	+"	 },\n"
	+"   load: function(scope, params){\n"
	+"			   var me = this;\n"
	+"	           params = angular.extend(scope.getDatasource(scope.pageMeta, '#{datasource}'));\n"
	+"			   params.method = 'find-range';\n"	
	+"			   params.pageSize = scope.app_config.table_entries;\n"
	+"			   params.pageNum = me.pageNum;\n"			
	+"			   scope.loadDs(params, function (data) {\n"
	+"					if (data.rows) {\n"
	+"							scope.#{id}_#{datasource} = data.rows;\n"
	+"					}\n"
	+"			});\n"
	+"	 },\n"
	+"   prev: function(scope, params){\n"
	+"			   var me = this;\n"
	+"	           if (1 >= me.pageNum)\n"
	+"			   		return;\n"				
	+"			   me.pageNum--;\n"
	+"			   me.load(scope);\n"
	+"	 },\n"
	+"   next: function(scope, params){\n"
	+"			   var me = this;\n"
	+"	           if (me.pageNum == me.totalPage)\n"
	+"			   		return;\n"				
	+"			   me.pageNum++;\n"
	+"			   me.load(scope);\n"
	+"	 }\n"
    +"};\n";
	
	
	script = script.replace(/#{id}/g, this.Properties['id']);
	script = script.replace(/#{datasource}/g,this.Properties['datasource']);
	return script;
}