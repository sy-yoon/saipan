/***********************************************
 * File Name    : Table
 * Author       : sukyong, yoon
 * Date         : 2014-08-24
 * Descript     : 
***********************************************/
 
function List(){
	Rectangle.call(this);
	this.Type = 'List'; 
}

List.prototype = new Rectangle();

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
List.prototype.draw = function(ctx)
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
	if(this.Properties['template'] != undefined){
		ctx.fillStyle = "black";
		ctx.textAlign = 'center';
		ctx.font="bold 14px Tahoma";
		var top = this.Rect.Top,
			left = this.Rect.Left,
			item;
		
		ctx.fillText(this.Properties['template'].title, left ,top + HEADER_HEIGHT);
		top += HEADER_HEIGHT;
		ctx.font="bold 12px Tahoma";
		for(item in this.Properties['template'].subitems){
			ctx.fillText(item, left ,top + T_MARGIN);
			top += T_MARGIN;
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

List.prototype.makePrptSource = function(){
	
	var properties = Rectangle.prototype.makePrptSource.call(this);	
	
	for(var i in properties){
		if(properties[i].name == 'template'){
			properties[i].type = 'button';
		}
		
		if(properties[i].name == 'datasource'){
			properties[i].type = 'button';
		}
	}
	return properties;
}


List.prototype.updateSource = function(propertyId, propertyVal){
	Rectangle.prototype.updateSource.call(this, propertyId, propertyVal);
	this.Properties[propertyId] = propertyVal;
}



List.prototype.initProperties = function(){
	Rectangle.prototype.initProperties.call(this);
	this.Properties['template'] = {
		title : '',
		href : '',
		subitems : []
	};
	this.Properties['datasource'] ='';
	this.Properties['showHeader'] = true;
	this.Properties['showFooter'] = true;
	this.Properties['usePaging'] = true;
	this.Properties['title'] = 'Noname';
	this.Properties['class'] = 'products-list product-list-in-box';
}

List.prototype.genHtml = function(){
	var script = 
	"<div style='left:#{left}; top:#{top};'>"
	+"	<div class='box' style='width:#{width};'>"
	+"		<div class='box-header' ng-show='pageMeta.objects.#{id}.properties.showHeader'>"
	+"			<i class='fa fa-dot-circle-o'/>"
	+"			<h3 class='box-title'>{{pageMeta.objects.#{id}.properties.title}}</h3>"
	+"			<div class='box-tools pull-right'>"
	+"				<button class='btn btn-sm bg-orange' title={{LB.COMMON.EDIT}} ng-click='#{id}.editFlag = !#{id}.editFlag;' ng-model='#{id}.editFlag'>"
	+"					<i class='fa fa-edit'></i>"
	+"				</button>"
	+"				<button class='btn btn-sm bg-green'  title='{{LB.COMMON.ADD}}' ng-click='fnAdd()'>"
	+"					<i class='fa fa-plus-square'></i>"
	+"				</button>"
	+"			</div>"
	+"		</div>"
	+"		<div class='box-body'>"
	+"			<div class='#{class}'>"
	+"					<li class='item' ng-repeat='item in #{id}_#{datasource}'>"
	+"						<div class='product-img'>"
	+"							<img class='{{colors[$index%colors.length]}}'/>"	
	+"						</div>"
	+"						<div class='product-info'>"
	+"							<a href='' class='product-title'>{{item[pageMeta.objects.#{id}.properties.template.title]}}</a>"
	+"							<div class='btn-group pull-right' ng-show='#{id}.editFlag'>"					
    +"                    			<button class='btn btn-xs btn-default' title={{LB.COMMON.EDIT}} ng-click='#{id}.edit(item)'><i class='fa fa-edit'></i></button>"
    +"                    			<button class='btn btn-xs btn-danger' title={{LB.COMMON.REMOVE}} ng-click='#{id}.remove(item)' data-toggle='confirmation-singleton'><i class='fa fa-trash'></i></button>"
    +"                    		</div>"
	+"							<span class='product-description' ng-repeat='subitem in pageMeta.objects.#{id}.properties.template.subitems'>{{item[subitem]}}</span>"
	+"						</div>"
	+"					</li>"	
	+"			</div>"
	+"		</div>"
	+"		<div class='box-footer text-center' ng-show='pageMeta.objects.#{id}.properties.showFooter'>"
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
				

List.prototype.genScript = function(){
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
	+"	 },\n"
	+"   edit: function(scope, item){\n"
	+"			   var me = this;\n"
	+"	 },\n"
	+"   remove: function(scope, item){\n"
	+"			   var me = this;\n"
	+"	 },\n"
    +"};\n";
	
	
	script = script.replace(/#{id}/g, this.Properties['id']);
	script = script.replace(/#{datasource}/g,this.Properties['datasource']);
	return script;
}

List.prototype.genInitScript = function() {
	var script = "$scope.#{id}.loadCnt($scope, {});";
	script = script.replace(/#{id}/g, this.Properties['id']);
	return script;
}