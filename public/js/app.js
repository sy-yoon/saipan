(function(global) {
    var app = angular.module('app',['ngRoute']);
    app.config(function ($routeProvider, $controllerProvider, $httpProvider) {
    	    $routeProvider.
            when('/', {templateUrl: '/pages/main.html'}).
            when('/:name*', {
				templateUrl: function (a) {
					var name = a.name == undefined ? a : a.name;
					var parts = a.name.split('/');
					var page = '', part;
					for (i in parts) {
						part = parts[i].split("=");
						if (part[1] != undefined) continue;
						if (parts[i] == '') continue;
						page += parts[i] + '/';
					}
					var page = page.substr(0, page.length - 1);
					
					return '/pages/' + page + '.html';
				}
			}).
            otherwise({ redirectTo: '/' });
            
            // loading bar 처리
        $httpProvider.interceptors.push(function() {
            return {
                request: function(config) {
                    if (config.url.indexOf('.action') != -1) {
                        Spin.spin();
                    }
                    
                    return config;
                },
                response: function(response) {
					Spin.stop();
                    return response;
                },
                requestError: function(rejection) {
                    console.log(rejection.data);
                    Spin.stop();
                },
                responseError: function(rejection) {
                    console.log(rejection.data);
                    Spin.stop();
                }
            }
        });
    });
    
 
     
        
    app.run(function($rootScope, $http, $document) {
    	
    	
    	$rootScope.LB = LB;
    	$rootScope.MENU = MENU;
    	$rootScope.app_config = {
    		table_entries : 20
    	};
    	
    	
		
		$rootScope.alert_opt={};
		$rootScope.alert = function(message){
			$rootScope.alert_opt.message = message;
			$("#alert").modal('show');
		}
		
		
		$rootScope.confirm_opt = {
			message : LB.COMMON.ARE_U_SURE,
			fn_ok : function(){
				
			},
			fn_cancel : function(){
				
			},
			fn_close : function(){
				$('#confirm').modal('hide');
			}
		};
		$rootScope.confirm = function(options){
			$rootScope.confirm_opt = angular.extend($rootScope.confirm_opt,options);
			$("#confirm").modal('show');
		}
		
		
		
		$rootScope.colors = [
			'bg-primary',
			'bg-info',
			'bg-success',
			'bg-warning',
			'bg-danger',
			'bg-gray',
			'bg-navy',
			'bg-teal',
			'bg-purple',
			'bg-orange',
			'bg-maroon'
		]
		
		$rootScope.userInfoData = {};
		
		/*
		$http({
			url : 'commonData.action',
			method : 'POST',
			headers : {
				'Content-Type' : 'UTF-8'
			},
			async: false,
			params : {
				action: 'getSessionData'
			}
		}).success(function(data) {
			$rootScope.userInfoData = data;
		});
		*/
		
		
		
		
		
		$rootScope.logout=function(){
			$http({
				url : 'logout.action',
				method : 'POST',
				headers : {
					'Content-Type' : 'UTF-8'
				},
				params : {
				}
			}).success(function(data) {
				window.location = data.url;
			});
		}
	})

	
    global.app = app;
  
})(window);



