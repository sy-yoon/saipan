app.controller('meta.pagemgr', function ($scope, $routeParams, $http) {
    $scope.tableNm = $routeParams.tableNm;
    $scope.dbmsId = $routeParams.dbmsId;
    $scope.schemaId = $routeParams.schemaId;


    $scope.loadPageInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                collection: 'page_meta',
                predicate:{
                    pageId : 1,
                    pageNm : 1,
                    PageDesc : 1
                },
                method: 'find'
            }
        }).success(function (data) {
            if (data.rows && data.rows.length) {
                $scope.pageList = data.rows;
            }
        });
    }
    
    $scope.addPage = function(){
        $(document).ready(function(){
    		$scope.type = 'insert';
    		$("#pageDlg").modal('show');
    	});
    }

    $scope.editPage = function(item){
    	$(document).ready(function(){
    		$scope.type = 'update';
    		$scope.menu = item;
            if(item.parentId = 'ROOT')
                $scope.menu.root = true;
    		$("#menuDlg").modal('show');
    	});
    }
    
   
    $scope.removePage = function(selected) {
    	$scope.confirm({
    		fn_ok : function(){
		        $http({
		            url : 'jsonData.action',
		            method: 'POST',
		            params: {
		                collection: 'page_meta',
		                method : 'remove',
                        selector: {
                            pageId: selected.id
                        }
		            }
		        }).success(function(data) {
		            if (data.success === 'true') {
		            	$scope.alert($scope.LB.COMMON.REMOVE_OK);
		                $scope.loadPageInfo();
		            }
		        });
        	}
    	});
   
    }
   	
        
    $scope.submit = function () {
    	var pageId = $scope.page.id;
       
        
        $http({
            url : 'jsonData.action',
            method: 'POST',
            headers: {
            	'Content-Type': 'UTF-8'
            },
            params: {
                collection: 'page_meta',
                method : $scope.type,
                selector : {
                    pageId : pageId
                },
                data : {
                    pageId : pageId,
                    name : $scope.page.name,
                    href : $scope.page.desc
                }
            }
        }).success(function(data) {
            if (data.success == true) {
                $("#pageDlg").modal('hide');
                $scope.loadPageInfo();
                
            }
        });
    }
    
    Lib.pageInitialized(function () {
        $scope.loadPageInfo();
    });

});