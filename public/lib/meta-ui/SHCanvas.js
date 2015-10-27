/*******************************************************************************
 * File Name : SHCanvas.js Author : sukyong, yoon Date : 2012-02-24 Descript :
 ******************************************************************************/
/* Class Define */

function SHCanvas(canvas, scope) {
	this.Canvas = canvas;
	this.Tools = new Array();
	this.Tools[0] = new VisualTool();
	this.Tools[1] = new EssenceTool();
	this.ToolType = 0;
	this.VisualObjects = new Array();
	this.controlTree = new Array();
	this.Properties = {};
	this.datasources = new Array();
	this.controlType = undefined;
	this.scope = scope;
	var me = this;
	canvas.addEventListener('mousedown', function(event) {
				me.mousedown(event);
			});

	canvas.addEventListener('mousemove', function(event) {
				me.mousemove(event);
			});

	canvas.addEventListener('mouseup', function(event) {
				me.mouseup(event);
			});

	canvas.addEventListener('dblclick', function(event) {
				me.mousedblclick(event);
			});

	// properties initialize
	this.initProperties();

	// buffer canvas
	this.cnvsBuffer = document.createElement('canvas');
	this.cnvsBuffer.width = canvas.width;
	this.cnvsBuffer.height = canvas.height;

}

/** ****************** Mouse Event Method ******************* */
/*
 * Function Name : mousedown Parameter : Parameter : Return Type : int Author :
 * sukyong, yoon Date : 2012-02-24 Descript :
 */
SHCanvas.prototype.mousedown = function(event) {
	this.Tools[this.ToolType].mousedown(this, event);
}

/*
 * Function Name : mousemove Parameter : Parameter : Return Type : int Author :
 * sukyong, yoon Date : 2012-02-24 Descript :
 */
SHCanvas.prototype.mousemove = function(event) {
	this.Tools[this.ToolType].mousemove(this, event);
}

/*
 * Function Name : mouseup Parameter : Parameter : Return Type : int Author :
 * sukyong, yoon Date : 2012-02-24 Descript :
 */
SHCanvas.prototype.mouseup = function(event) {
	this.Tools[this.ToolType].mouseup(this, event);
	this.ToolType = 0;
}

SHCanvas.prototype.mousedblclick = function(event) {
}

/** ****************** Member Method ******************* */
/*
 * Function Name : Refresh Parameter : Parameter : Return Type : int Author :
 * sukyong, yoon Date : 2012-02-24 Descript :
 */
SHCanvas.prototype.refresh = function() {
	var ctx = this.cnvsBuffer.getContext('2d');
	ctx.fillStyle = 'black';
	ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
	this.drawFormLayer();

	for (var i = 0; i < this.VisualObjects.length; i++) {
		if(this.VisualObjects[i].parent == undefined)
			this.VisualObjects[i].draw(ctx);
	}

	if (this.selectedVisual != undefined)
		this.selectedVisual.trackDraw(ctx);

	var ctxView = this.Canvas.getContext('2d');
	ctxView.drawImage(this.cnvsBuffer, 0, 0);
}


/*
 * Function Name : getVisual Parameter : Parameter : Return Type : int Author :
 * sukyong, yoon Date : 2012-02-24 Descript :
 */
SHCanvas.prototype.getVisualByPoint = function(x, y) {
	for (var i = this.VisualObjects.length-1; i>=0 ; i--) {
		if (this.VisualObjects[i].makeHitTest(new Point(x, y)) != -1)
			return this.VisualObjects[i];
	}
	return undefined;
}

SHCanvas.prototype.selectAll = function() {
	for (var i = 0; i < this.VisualObjects.length; i++) {
		this.VisualObjects[i].IsSelected = true;
	}
	this.refresh();
}

SHCanvas.prototype.unSelect = function() {
	for (var i = 0; i < this.VisualObjects.length; i++) {
		this.VisualObjects[i].IsSelected = false;
	}
	this.refresh();

	this.scope.selectControl(this);
}

SHCanvas.prototype.addVisualObject = function(parent, visualObject) {
	this.VisualObjects.push(visualObject);
	//this.VisualObjects[visualObject.Id] = visualObject;
	
	if(parent != undefined && parent.children != undefined){
		visualObject.parent = parent;
		parent.children.push(visualObject);
	}
	
	this.scope.addChild(parent, visualObject);
	//this.controlTree.push(visualObject);
}

SHCanvas.prototype.drawFormLayer = function() {
	var ctx = this.cnvsBuffer.getContext('2d');
	ctx.strokeStype = "black";
	ctx.beginPath();
	ctx.lineWidth = '0.11';
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
	ctx.stroke();

	ctx.lineWidth = '0.1';
	var i = 0;
	for (i = 0; i <= this.Canvas.width; i = i + 10) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, this.Canvas.height);
	}

	for (i = 0; i <= this.Canvas.height; i = i + 10) {
		ctx.moveTo(0, i);
		ctx.lineTo(this.Canvas.width, i);
	}

	ctx.stroke();
	/*
	this.drawPageHeader(ctx);
	this.drawPageBody(ctx);
	this.drawPageFooter(ctx);

	ctx.stroke();
	*/
}


SHCanvas.prototype.drawPageHeader = function(ctx) {	
	var PAGE_HEADER_HEIGHT = 50;
	ctx.fillStyle = 'gray';
	ctx.fillRect(0, 0, this.Canvas.width, PAGE_HEADER_HEIGHT);
	ctx.rect(10,10,200,30);
}

SHCanvas.prototype.drawPageBody = function(ctx) {
	
}

SHCanvas.prototype.drawPageFooter = function(ctx) {
	
}

SHCanvas.prototype.select = function(control) {
	control.IsSelected = true;
	this.selectedVisual = control;
	this.scope.selectControl(control);
}

SHCanvas.prototype.genHtml = function() {
	var script = 
	"<script>\n"
	+"app.registerCtrl('#{id}', function ($scope, $routeParams, $http) {\n"
	+ this.genScript()
	+"	Lib.pageInitialized(function () {\n"
	//+"		var promise = $scope.loadPageMeta('#{id}');\n"
	//+"		promise.then(\n"
	//+"			function(resolve){\n"
    //+"    			$scope.pageMeta = resolve;\n"
	+ this.genInitScript()
    //+"   		}, \n"
	//+"			function(reject){\n"
    //+"    			alert(reject)   \n"   
    //+"			}\n"
	//+"		);\n"
	+"\n"
	+"\n"
	+"\n"
	+"\n"
	+"	});\n"
	+"});\n"
	+"</script>\n"
	+"<div ng-controller='#{id}'>"
	+"	<!-- Content Header (Page header) -->"
	+"	<section class='content-header'>"
	+"		<h1>"
	+"		{{pageMeta.pageNm}}"
	+"		</h1>"
	+"		<ol class='breadcrumb'>"
	+"		</ol>"
	+"	</section>"
	+"	<!-- Main content -->"
	+"	<section class='content'>"
	+"		<div>"
	+ this.genContentHtml() 		
	+"		</div>"
	+"	</section>"
	+"</div>";
	
	script  = script.replace(/#{id}/g,this.Properties['id']);
	return script;
}

SHCanvas.prototype.genDataSource = function() {
	var script = "";
	
	return script;
}

SHCanvas.prototype.genDataSourceFields = function(dataSource) {
	var script = '';
	for(var i=0; i<dataSource['fields'].length; i++){
		if(i!=0){
			script += ',';
		}
		script += "{ name : "+singleQuotes(dataSource['fields'][i]['colName'])+" }\n";
	}
	return script;
}


SHCanvas.prototype.genContentHtml = function() {
	var script = "";
	
	for (var i = 0; i < this.VisualObjects.length; i++) {
		if(this.VisualObjects[i].parent == undefined)
			script += this.VisualObjects[i].genHtml();
	}
	return script;
}

SHCanvas.prototype.genScript = function() {
	var script = "";
	for (var i = 0; i < this.VisualObjects.length; i++) {
		if(this.VisualObjects[i].parent == undefined)
			script += this.VisualObjects[i].genScript();
	}
	
	/*
	for(i=0; i<this.datasources.length; i++){
		script += this.datasources[i];
	}
	*/
	return script;
}

SHCanvas.prototype.genInitScript = function() {
	var script = "";
	for (var i = 0; i < this.VisualObjects.length; i++) {
			script += this.VisualObjects[i].genInitScript();
	}
	
	return script;
}

SHCanvas.prototype.makePrptSource = function() {
	var properties = [];
	
	for(var index in this.Properties){
		properties.push({
			name : index,
			type : 'text',
			value : this.Properties[index]
		});
	}
	
	properties.push({
		name : 'width',
		value : this.Canvas.width
	});
	
	properties.push({
		name : 'height',
		value : this.Canvas.height
	});
	
	return properties;
}

SHCanvas.prototype.initProperties = function() {
	this.Properties['id'] = 'PAGE';
	this.Properties['name'] = 'NewDocument';
	this.Properties['desc'] = '';
}

SHCanvas.prototype.updateSource = function(propertyId, propertyVal) {
	if (propertyId == 'width') {
		this.cnvsBuffer.width = this.Canvas.width = propertyVal;
		this.refresh();
	} else if (propertyId == 'height') {
		this.cnvsBuffer.height = this.Canvas.height = propertyVal;
		this.refresh();
	}
	
	this.Properties[propertyId] = propertyVal;
}

SHCanvas.prototype.addDatasource = function(dataSource) {
	this.datasources.push(dataSource);
}

SHCanvas.prototype.getMetaData = function() {
	var objects = {};
	for (var i = 0; i < this.VisualObjects.length; i++) {
			if(this.VisualObjects[i].Properties['id'] != undefined){
				objects[this.VisualObjects[i].Properties['id']] = {
					'type' : this.VisualObjects[i].Type,
					'properties' : this.VisualObjects[i].Properties,
					'left' : this.VisualObjects[i].Rect.Left,
					'top' : this.VisualObjects[i].Rect.Top,
					'width' : this.VisualObjects[i].Rect.width(),
					'height' : this.VisualObjects[i].Rect.height()
				}
		}
	}
	
	var pageMeta = {
		'pageId' : this.Properties['id'],
		'pageNm' : this.Properties['name'],
		'pageDesc' : this.Properties['desc'],
		'datasources' : this.datasources,
		'objects' : objects,
		'html' : this.genHtml()
	}
	
	return pageMeta;
}

SHCanvas.prototype.open = function(page) {
	this.Properties['id'] = page.pageId;
	this.Properties['name'] = page.pageNm;
	this.Properties['desc'] = page.pageDesc;
	if(page.datasources != undefined)
		this.datasources = page.datasources;
	
	for (var objId in page.objects) {
		var obj = page.objects[objId];
		var control = undefined;
		if (obj.type == 'Button')
			control = new Button();
		else if (obj.type == 'Check')
			control = new Check();
		else if (obj.type == 'Combo')
			control = new Combo();
		else if (obj.type == 'TextBox')
			control = new TextBox();
		else if (obj.type == 'Tree')
			control = new Tree();
		else if (obj.type == 'Box')
			control = new Box();
		else if (obj.type == 'Table')
			control = new Table();
		else if (obj.type == 'Label')
			control = new Label();
		else if (obj.type == 'Panel')
			control = new Panel();
		else if (obj.type == 'List')
			control = new List();
			
		control.Properties = obj.properties;
		control.Track_Rect.Left = obj.left;
		control.Track_Rect.Top = obj.top;
		control.Track_Rect.Right = control.Track_Rect.Left + obj.width;
		control.Track_Rect.Bottom = control.Track_Rect.Top + obj.height;
		control.trackEnd();
		
		
		this.addVisualObject(undefined, control);
	}
	
	
}