app.controller('main', function($scope, $http) {
	$scope.addChild = function(parent, item){
		return parent.addChild({
	        title: item.name,
	        data : item,
	        icon : false,
	        key : item.id,
			href : item.href
	    });
	}
	
	$scope.loadDbms = function(parent){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'dbms',
				method : 'find'
	        }
	    }).success(function(data) {
			if (data.rows) {
				$.each(data.rows, function(i, item){
					
					var dbNode = $scope.addChild(parent, {
						name : item.DBMS_NM,
						id : item.DBMS_ID,
						dbmsType : item.dbmsType,
						href : ''
					});
					
					$scope.loadSchema(dbNode);
					
				});
			}
		});
	}
	
	$scope.loadSchema = function(parent){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'schema',
				method : 'find',
				selector : {
					DBMS_ID : parent.data.key
				}
				
	        }
	    }).success(function(data) {
			if (data.rows) {
				$.each(data.rows, function(i, item){
					var schNode = $scope.addChild(parent, {
						name : item.SCHEMA_NM,
						id : item.SCHEMA_ID,
						href : '#pages/dbms/schema'
					});
					
					$.each( $scope.config.dbmsObject, function(i, dbmsObj){
						if(dbmsObj.dbmsType == parent.data.data.dbmsType){
							for(obj in dbmsObj.OBJECTS){
								$scope.addChild(schNode, {
									name : dbmsObj.OBJECTS[obj],
									id : item.SCHEMA_ID,
									href : '#pages/dbms/'+dbmsObj.OBJECTS[obj].toLowerCase()+'?schemaId='+item.SCHEMA_ID
								});	
							}	
						}
					});
				});
			}
		});
	}
	
	$scope.loadStdArea = function(parent){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'std_area',
				method : 'find'
	        }
	    }).success(function(data) {
			if (data.rows) {
				var items = [];
				$.each(data.rows, function(i, item){
					var menuItem =  {
						name : item.STD_AREA_NM,
						id : item.STD_AREA_ID,
						href : ''
					}
						
					if(item.UP_ID == 'ROOT'){
						items[item.STD_AREA_ID] = $scope.addChild(parent, menuItem);
						
						$scope.addChild(items[item.STD_AREA_ID], {
							name : 'Word',
							id : item.STD_AREA_ID,
							href : '#pages/std/word?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							name : 'Domain',
							id : item.STD_AREA_ID,
							href : '#pages/std/domain?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							name : 'Term',
							id : item.STD_AREA_ID,
							href : '#pages/std/term?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							name : 'Code',
							id : item.STD_AREA_ID,
							href : '#pages/std/code?stdAreaId='+item.STD_AREA_ID
						});
					}
					else{
						var parentNode = items[item.UP_ID];
						if(parentNode != undefined){
							items[item.STD_AREA_ID] = $scope.addChild(parentNode, menuItem);
						}else{
							items[item.STD_AREA_ID] = $scope.addChild(parent, menuItem);
						}
					}
					
				});
			}
		});
	}
	
	$scope.loadMenu = function(parent){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'menu',
				method : 'find'
	        }
	    }).success(function(data) {
			if (data.rows) {
				var items = [];
				$.each(data.rows, function(i, item){	
					if(item.parentId == 'ROOT'){
						items[item.id] = $scope.addChild($scope.rootNode, item);
					}
					else{
						var parentNode = items[item.parentId];
						if(parentNode != undefined){
							items[item.id] = $scope.addChild(parentNode, item);
						}else{
							items[item.id] = $scope.addChild($scope.rootNode, item);
						}
					}
				});
				
				$scope.rootNode.visit(function(node){
					// std_area home
					if(node.data.key == '1'){
						$scope.loadStdArea(node);
					}
					
					// db_area home
					if(node.data.key == '3'){
						$scope.loadDbms(node);
					}
			        node.expand(true);
			    });
			}
		});
	}
	
	
	$scope.createMenu = function(){
		$(function(){
		    if($scope.tree == undefined){
			    $("#tree").dynatree({
			        onActivate: function(node) {
			        	window.location.href = node.data.href;
			        }
			    });
			    
			    $scope.tree = $("#tree").dynatree("getTree");
		    }
		    // Now get the root node object
		    $scope.rootNode = $scope.tree.getRoot();
		   
		    $scope.rootNode.removeChildren();
		    $scope.loadMenu('ROOT');
		});
	}
	
	$scope.createMenu();
	
});