app.controller('page', function ($scope, $routeParams, $http) {
	
	$scope.selectControl = function(control){
		$scope.control = control;
		$scope.ctrlProperties = control.makePrptSource();
		$scope.$apply(control);
	}

	$scope.setControl = function(controlType){
		$scope.canvas.ToolType = 1;
		$scope.canvas.controlType = controlType; 
	}
	
	$scope.propertyChanged = function(item){
		$scope.control.updateSource(item.name, item.value);
		
		
		if(item.name == 'datasource'){
			for(var i in $scope.canvas.datasources){
				if($scope.canvas.datasources[i].id == item.value){
					$scope.makeTableHeader($scope.canvas.datasources[i], $scope.control);			
				}
			}
		}
		
		$scope.canvas.refresh();
	}
	
	$scope.makeTableHeader = function(ds, table){
		$http({
            url : 'jsonData.action',
            method: 'POST',
            headers: {
            	'Content-Type': 'UTF-8'
            },
            params: {
                collection: ds.collection,
                method : 'find-one'
            }
        }).success(function(data) {
            if (data.doc) {
				var header = [];
                for (var key in data.doc) {
					header.push({
						label : key,
						field : key,
						width : 100
					})
				}
				
				
				table.Properties['header'] = header;
					
            }
        });
	}
	
	
	
	$scope.propertyBtnClick = function(item){
		$scope.property = item;
		if(item.name == 'header'){
			$scope.header = item.value;
			$(document).ready(function(){
				$("#headerDlg").modal('show');
			});
		}else if(item.name == 'datasource'){
			$(document).ready(function(){
				$("#dsListDlg").modal('show');
			});
		}
	}
	
	$scope.addChild = function(parent, item){
		if(parent == undefined)
			parent =  $scope.rootNode;
		else
			parent = $scope.objTree.getNodeByKey(parent.Id);
		
		return parent.addChild({
	        title: item.Properties['id'],
	        data : item,
	        icon : false,
	        key : item.Id
	    });
	}
	
	$scope.autoFormat = function () {
		var totalLines = $scope.htmlEditor.lineCount();
		$scope.htmlEditor.autoFormatRange({line:0, ch:0}, {line:totalLines});
	}

	$scope.run = function(){
		if($scope.canvas){
			$scope.pageMeta = $scope.canvas.getMetaData();
			$scope.html = $scope.canvas.genHtml();
			$scope.htmlEditor.setValue($scope.html);
			$scope.autoFormat();
		}
		
		//window.location.href = '#pages/meta/test';
	}
	
	$scope.addDs = function(){
		$(document).ready(function(){
			$scope.datasource = {
				id : '',
				collection : '',
				method : ''
			};
			
			$("#dsDlg").modal('show');
		});
	}
	
	$scope.selectDs = function(ds){
		$scope.property.value = ds.id;
		$scope.propertyChanged($scope.property);
		$("#dsListDlg").modal('hide');
	}
	
	$scope.saveDs = function(){
		$("#dsDlg").modal('hide');
		$scope.canvas.addDatasource($scope.datasource);
	}
	
	$scope.savePage = function(){
		var pageMeta = $scope.canvas.getMetaData();
		
		$http({
			url: 'jsonData.action',
			method: 'POST',
			params: {
				collection: 'page_meta',
				method: 'update',
				selector: {
                   pageId: pageMeta.pageId
                },
				data: pageMeta
			}
		}).success(function (data) {
			if (data.success === 'true') {
				$scope.alert($scope.LB.COMMON.REMOVE_OK);
				$scope.fnLoadBizArea();
			}
		});
	}
	
	Lib.pageInitialized(function () {
		if ($scope.objTree == undefined) {
			$("#objTree").dynatree({
				onActivate: function (node) {
					if($scope.canvas != undefined){
						$scope.canvas.unSelect();
						$scope.canvas.select(node.data.data);
						$scope.canvas.refresh();
					}
				}
			});

			$scope.objTree = $("#objTree").dynatree("getTree");
		}
		// Now get the root node object
		$scope.rootNode = $scope.objTree.getRoot();
		$scope.rootNode.removeChildren();
		
		var canvas = document.getElementById("pageCanvas");
		$scope.canvas = new SHCanvas(canvas, $scope);
		$scope.canvas.refresh();
		
		if($scope.htmlEditor == undefined){
			$scope.htmlEditor = createCodeMirror(document.getElementById('htmlEditor'), {readOnly:false, mode:'text/html'});
		}
		
		
		
		
	});
});
