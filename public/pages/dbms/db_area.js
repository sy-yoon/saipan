app.registerCtrl('db_area', function($scope, $http) {
	
	$scope.loadDbmsList = function(){
		$http({
	        url : 'jsonData.action',
	        method: 'POST',
	        params: {
	            collection: 'dbms',
	            method: 'find'
	        }
	    }).success(function(data) {
	        if (data.rows) {
	            $scope.dbmsList = data.rows;
	        }
	    });
	}
    
    $scope.fnAdd = function(){
    	$(document).ready(function(){
    		$scope.type = 'insert';
    		$scope.dbmsNm = '';
    		$scope.dbmsDesc = '';
    		$("#dbmsDlg").modal('show');
    	});
    }
    
    $scope.fnEdit = function(item){
    	$(document).ready(function(){
    		$scope.type = 'update';
    		$scope.dbmsId = item.DBMS_ID;
    		$scope.dbmsNm = item.DBMS_NM;
    		$scope.dbmsDesc = item.DBMS_DESC;
            $scope.dbmsType = item.DBMS_TYPE,
            $scope.ip = item.IP;
            $scope.port = item.PORT;
            $scope.acct = item.ACCT;
            $scope.pwd = item.PWD;
            $scope.sid = item.SID;
            $scope.schema = item.SCHEMA;
    		$("#dbmsDlg").modal('show');
    	});
    }
    
   
    $scope.fnRemove = function(selected) {
    	$scope.confirm({
    		fn_ok : function(){
		        $http({
		            url : 'jsonData.action',
		            method: 'POST',
		            params: {
		                collection: 'dbms',
		                method : 'remove',
		                DBMS_ID: selected.DBMS_ID
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
    	var dbmsId = $scope.dbmsId;
    	if($scope.type == 'insert'){
    		dbmsId = Lib.getGUID();
    	}
        
        $http({
            url : 'jsonData.action',
            method: 'POST',
            headers: {
            	'Content-Type': 'UTF-8'
            },
            params: {
                collection: 'dbms',
                method : $scope.type,
                selector : {
                    DBMS_ID: dbmsId
                },
                data : {
                    DBMS_ID: dbmsId,
                    DBMS_NM: $scope.dbmsNm,
                    DBMS_TYPE: $scope.dbmsType,
                    IP: $scope.ip,
                    PORT: $scope.port,
                    ACCT: $scope.acct,
                    PWD: $scope.pwd,
                    SID: $scope.sid,
                    SCHEMA: $scope.schema.toUpperCase(),
                }
            }
        }).success(function(data) {
            if (data.success == true) {
                $("#dbmsDlg").modal('hide');
                $scope.alert($scope.LB.COMMON.SAVE_OK);
                $scope.fnLoadBizArea();
                
            }
        });
    }
    
    
    Lib.pageInitialized(function(){
        $scope.loadDbmsList();
    });
});