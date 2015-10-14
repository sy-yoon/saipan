
	
angular.module('login', []).controller('loginCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.fnLogin = function(){
    	$http({
			url : 'loginProcess.action',
			method : 'POST',
			headers : {
				'Content-Type' : 'UTF-8'
			},
			params : {
				loginId : $scope.loginId,
				password : Lib.md5($scope.password)
			}
		}).success(function(data) {
			window.location = data.url;
		});
    }    
}]);

