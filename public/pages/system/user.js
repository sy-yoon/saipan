app.controller('system.user', function($scope, $http) {
	$scope.getUser = function() {
        $http({
            url : 'jsonData.action',
            method: 'POST',
            params: {
                bizArea: 'aq',
                sqlId : 'getUserList'
            }
        }).success(function(data) {
            if (data.rows) {
                $scope.itemList = data.rows;
            }
        });
	}
    
    
    $scope.fnAdd = function(){
         $(document).ready(function() {
         	$scope.type = 'add';
         	
			$scope.userNm = '';
			$scope.loginId = '';
			$scope.email = '';
			$scope.password = '';
			
         	$("#userDlg").modal('show');
         });

    }
    
     $scope.fnEdit = function(item) {
         $(document).ready(function() {
         	$scope.type = 'edit';
         	$scope.userId = item.USER_ID;
			$scope.userNm = item.USER_NM;
			$scope.loginId = item.LOGIN_ID;
			$scope.email = item.EMAIL;
			$scope.password = item.PASSWORD;
         	$("#userDlg").modal('show');
         });
        
    }
    
    $scope.fnRemove = function(item) {
		$scope.confirm({
    		fn_ok : function(){
    			$http({
		            url : 'jsonData.action',
		            method: 'POST',
		            params: {
		                bizArea: 'aq',
		                sqlId : 'deleteUserInfo',
		                USER_ID: item.USER_ID
		            }
		        }).success(function(data) {
		            if (data.success === 'true') {
		            	$scope.alert($scope.LB.COMMON.REMOVE_OK);
		            	$scope.getUser();
		            }
		        });  
    		
    		}});
        
    }
    
    $scope.submit = function(){

                            
    	var sqlId = 'updateUserInfo',
    	userId = $scope.userId;
    	if($scope.type == 'add'){
    		sqlId = 'insertUserInfo';
    		userId = Lib.getGUID();
    	}
    			
    	$http({
            url : 'jsonData.action',
            method: 'POST',
            params: {
                bizArea: 'aq',
                sqlId : sqlId,
                USER_ID: userId,
                LOGIN_ID: $scope.loginId,
                USER_NM: $scope.userNm,
                EMAIL: $scope.email,
                PASSWORD: Lib.md5($scope.password)
            }
        }).success(function(data) {
            if (data.success === 'true') {
            	$scope.alert($scope.LB.COMMON.SAVE_OK);
            	$("#userDlg").modal('hide');
            	$scope.getUser();
            }
        });
    }
    
  
    
    $scope.getUser();
});