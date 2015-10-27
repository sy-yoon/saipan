app.controller('system.menumgr', function($scope, $http) {
	
    $scope.menuTree = {};
    $scope.menuData = [];
    $scope.expanding_property = {
            field : "name",
            displayName: "Menu name"
        };
    $scope.selections = [];
    $scope.col_defs = [
    	{
            field : "href",
            displayName: "Link",
            sortable : true,
            filterable : true
        },{
            field : "pageId",
            displayName: "Meta Page",
            sortable : true,
            filterable : true
        },{
            cellTemplate: "<div class='btn-group pull-right' ng-show='cellTemplateScope.flag'>"							
                         +"	<button class='btn btn-xs btn-default' title={{LB.COMMON.EDIT}} ng-click='cellTemplateScope.editMenu(row.branch)'><i class='fa fa-edit'></i></button>"
                         +"		<button class='btn btn-xs btn-danger' title={{LB.COMMON.REMOVE}} ng-click='cellTemplateScope.removeMenu(row.branch)'><i class='fa fa-trash'></i></button>"
                      	 +"	</div>",
            cellTemplateScope: $scope
        }
	];
    
    $scope.getFlag = function(){
        return true;
    }
    
    $scope.loadMenu = function(){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'menu',
				method : 'find'
	        }
	    }).success(function(data) {
			if (data.rows) {
				$scope.menuData = $scope.getTree(data.rows, "id","parentId");
			}
		});
	}
    
    $scope.loadPage = function(){
	 	$http({
	        url : 'jsondata.action',
	        method: 'POST',
	        params: {
				collection : 'page_meta',
                predicate : {
                    _id : 0,
                    pageId : 1,
                    pageNm : 1
                },
				method : 'find'
	        }
	    }).success(function(data) {
			if (data.rows) {
				$scope.pages = data.rows;
			}
		});
	}
 
    $scope.addMenu = function(){
    	$(document).ready(function(){
    		$scope.type = 'insert';
    		$("#menuDlg").modal('show');
    	});
    }
    
    $scope.editMenu = function(item){
    	$(document).ready(function(){
    		$scope.type = 'update';
    		$scope.menu = item;
            if(item.parentId = 'ROOT')
                $scope.menu.root = true;
    		$("#menuDlg").modal('show');
    	});
    }
    
   
    $scope.removeMenu = function(selected) {
    	$scope.confirm({
    		fn_ok : function(){
		        $http({
		            url : 'jsonData.action',
		            method: 'POST',
		            params: {
		                collection: 'menu',
		                method : 'remove',
                        selector: {
                            id: selected.id
                        }
		            }
		        }).success(function(data) {
		            if (data.success === 'true') {
		            	$scope.alert($scope.LB.COMMON.REMOVE_OK);
		                $scope.loadMenu();
		            }
		        });
        	}
    	});
   
    }
   	
        
    $scope.submit = function () {
    	var menuId = $scope.menu.id,
        parentId = $scope.menu.parentId;
    	if($scope.type == 'insert'){
    		menuId = Lib.getGUID();
            
            if($scope.menu.root){
                parentId = 'ROOT';
            }else{
                parentId = $scope.menu.id;
            }
    	}
        
        $http({
            url : 'jsonData.action',
            method: 'POST',
            headers: {
            	'Content-Type': 'UTF-8'
            },
            params: {
                collection: 'menu',
                method : $scope.type,
                selector : {
                    id : menuId
                },
                data : {
                    id : menuId,
                    parentId : parentId,
                    name : $scope.menu.name,
                    href : $scope.menu.href,
                    pageId : $scope.menu.pageId
                }
            }
        }).success(function(data) {
            if (data.success == true) {
                $("#menuDlg").modal('hide');
                $scope.loadMenu();
                
            }
        });
    }
    
    $scope.menuselect = function(branch){
        $scope.menu = branch;
        console.log('you clicked on', branch)
    }
    
    $scope.getTree = function (data, primaryIdName, parentIdName, id) {
        if (!data || data.length == 0 || !primaryIdName || !parentIdName)
            return [];

        var tree = [],
            rootIds = [],
            item = data[0],
            primaryKey = item[primaryIdName],
            treeObjs = {},
            parentId,
            parent,
            len = data.length,
            i = 0;

        while (i < len) {
            item = data[i++];
            primaryKey = item[primaryIdName];
            treeObjs[primaryKey] = item;
            parentId = item[parentIdName];

            if (parentId != 'ROOT') {
                parent = treeObjs[parentId];

                if (parent.children) {
                    parent.children.push(item);
                }
                else {
                    parent.children = [item];
                }
            }
            else {
                rootIds.push(primaryKey);
            }
        }

        for (var i = 0; i < rootIds.length; i++) {
            tree.push(treeObjs[rootIds[i]]);
        };

        return tree;
    }
    
    Lib.pageInitialized(function(){
        $scope.loadMenu();
        $scope.loadPage();
    });
});