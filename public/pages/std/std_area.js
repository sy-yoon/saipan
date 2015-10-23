app.registerCtrl('std_area', function($scope, $http) {
	
	$scope.fnLoadBizArea = function(){
		$http({
	        url : 'jsonData.action',
	        method: 'POST',
	        params: {
	            collection: 'std_area',
	            method: 'find'
	        }
	    }).success(function(data) {
	        if (data.rows) {
	            $scope.bizAreaList = data.rows;
	        }
	    });
	}
    
    $scope.fnAdd = function(){
    	$(document).ready(function(){
    		$scope.type = 'insert';
    		$scope.bizNm = '';
    		$scope.bizDesc = '';
    		$("#areaDlg").modal('show');
    	});
    }
    
    $scope.fnEdit = function(item){
    	$(document).ready(function(){
    		$scope.type = 'update';
    		$scope.aqBizId = item.STD_AREA_ID;
    		$scope.bizNm = item.STD_AREA_NM;
    		$scope.bizDesc = item.STD_AREA_DESC;
    		$("#areaDlg").modal('show');
    	});
    }
    
   
    $scope.fnRemove = function(selected) {
    	$scope.confirm({
    		fn_ok : function(){
		        $http({
		            url : 'jsonData.action',
		            method: 'POST',
		            params: {
		                collection: 'std_area',
		                method : 'remove',
		                AQ_BIZ_ID: selected.AQ_BIZ_ID
		            }
		        }).success(function(data) {
		            if (data.success === 'true') {
		            	$scope.alert($scope.LB.COMMON.REMOVE_OK);
		                $scope.fnLoadBizArea();
		            }
		        });
        	}
    	});
   
    }
   	    
    $scope.submit = function () {
    	var aqBizId = $scope.aqBizId;
    	if($scope.type == 'insert'){
    		aqBizId = Lib.getGUID();
    	}
    		
        $http({
            url : 'jsonData.action',
            method: 'POST',
            headers: {
            	'Content-Type': 'UTF-8'
            },
            params: {
                collection: 'std_area',
                method : $scope.type,
                data : {
                    STD_AREA_ID: aqBizId,
                    UP_ID: 'ROOT',
                    STD_AREA_NM: $scope.bizNm,
                    STD_AREA_DESC: $scope.bizDesc
                }
                
            }
        }).success(function(data) {
            if (data.success == true) {
                $("#areaDlg").modal('hide');
                $scope.alert($scope.LB.COMMON.SAVE_OK);
                $scope.fnLoadBizArea();
                
            }
        });
    }
    
    Lib.pageInitialized(function(){
        $scope.fnLoadBizArea();
    });
    
    
});