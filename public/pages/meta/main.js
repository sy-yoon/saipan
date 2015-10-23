app.controller('main', function($scope, $http) {
	$scope.addChild = function(parent, item){
		return parent.addChild({
	        title: item.NAME,
	        data : item,
	        icon : false,
	        key : item.ID,
			href : item.HREF
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
						NAME : item.DBMS_NM,
						ID : item.DBMS_ID,
						DBMS_TYPE : item.DBMS_TYPE,
						HREF : ''
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
						NAME : item.SCHEMA_NM,
						ID : item.SCHEMA_ID,
						HREF : '#dbms/schema'
					});
					
					
					$.each( $scope.config.dbmsObject, function(i, dbmsObj){
						if(dbmsObj.DBMS_TYPE == parent.data.data.DBMS_TYPE){
							for(obj in dbmsObj.OBJECTS){
								$scope.addChild(schNode, {
									NAME : dbmsObj.OBJECTS[obj],
									ID : item.SCHEMA_ID,
									HREF : '#dbms/'+dbmsObj.OBJECTS[obj].toLowerCase()+'?schemaId='+item.SCHEMA_ID
								});	
							}	
						}
					});
				
					
					/*	
					$scope.addChild(schNode, {
						NAME : 'Indexes',
						ID : item.SCHEMA_ID,
						HREF : '#dbms/indexes?schemaId='+item.SCHEMA_ID
					});
					
					$scope.addChild(schNode, {
						NAME : 'Constraints',
						ID : item.SCHEMA_ID,
						HREF :  '#dbms/constraints?schemaId='+item.SCHEMA_ID
					});
					
					$scope.addChild(schNode, {
						NAME : 'Procedures',
						ID : item.SCHEMA_ID,
						HREF :  '#dbms/procedures?schemaId='+item.SCHEMA_ID
					});*/
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
						NAME : item.STD_AREA_NM,
						ID : item.STD_AREA_ID,
						HREF : ''
					}
						
					if(item.UP_ID == 'ROOT'){
						items[item.STD_AREA_ID] = $scope.addChild(parent, menuItem);
						
						$scope.addChild(items[item.STD_AREA_ID], {
							NAME : 'Word',
							ID : item.STD_AREA_ID,
							HREF : '#std/word?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							NAME : 'Domain',
							ID : item.STD_AREA_ID,
							HREF : '#std/domain?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							NAME : 'Term',
							ID : item.STD_AREA_ID,
							HREF : '#std/term?stdAreaId='+item.STD_AREA_ID
						});
						
						$scope.addChild(items[item.STD_AREA_ID], {
							NAME : 'Code',
							ID : item.STD_AREA_ID,
							HREF : '#std/code?stdAreaId='+item.STD_AREA_ID
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
					if(item.PARENT_ID == 'ROOT'){
						items[item.ID] = $scope.addChild($scope.rootNode, item);
					}
					else{
						var parentNode = items[item.PARENT_ID];
						if(parentNode != undefined){
							items[item.ID] = $scope.addChild(parentNode, item);
						}else{
							items[item.ID] = $scope.addChild($scope.rootNode, item);
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
	
	//$scope.createMenu();
	
});