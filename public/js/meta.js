(function (global) {
    var app = angular.module('meta', ['ngRoute','treeGrid']);
    app.config(function ($routeProvider, $controllerProvider, $httpProvider) {
		// for dynamic controller 
		app.registerCtrl = $controllerProvider.register;
		// route cofiguation
		$routeProvider.
            when('/', { templateUrl: '/pages/meta/page.html' }).
            when('/pagemgr', {templateUrl: 'pages/meta/pagemgr.html' }).
            when('/menumgr', {templateUrl: 'pages/system/menumgr.html' }).
            when('/svrfuncmgr', {templateUrl: 'pages/meta/svrfuncmgr.html' }).
			when('/page/:pageId', {templateUrl: 'pages/meta/page.html' }).
            otherwise({ redirectTo: '/' });
            
		// loading bar image
        $httpProvider.interceptors.push(function () {
            return {
                request: function (config) {
                    if (config.url.indexOf('.action') != -1) {
                        Spin.spin();
                    }

                    return config;
                },
                response: function (response) {
					Spin.stop();
                    return response;
                },
                requestError: function (rejection) {
                    console.log(rejection.data);
                    Spin.stop();
                },
                responseError: function (rejection) {
                    console.log(rejection.data);
                    Spin.stop();
                }
            }
        });
    });
	
	
	app.directive('dynamic', function ($compile) {
		return {
			restrict: 'A',
			replace: true,
			link: function (scope, ele, attrs) {
				scope.$watch(attrs.dynamic, function (html) {
					ele.html(html);
					$compile(ele.contents())(scope);
				});
			}
		};
	});




    app.run(function ($rootScope, $http, $document, $q) {
		$rootScope.LB = LB;
		$rootScope.MENU = MENU;
		$rootScope.app_config = {
			table_entries: 20
		};

		$rootScope.alert_opt = {};
		$rootScope.alert = function (message) {
			$rootScope.alert_opt.message = message;
			$("#alert").modal('show');
		}


		$rootScope.confirm_opt = {
			message: LB.COMMON.ARE_U_SURE,
			fn_ok: function () {

			},
			fn_cancel: function () {

			},
			fn_close: function () {
				$('#confirm').modal('hide');
			}
		};
		$rootScope.confirm = function (options) {
			$rootScope.confirm_opt = angular.extend($rootScope.confirm_opt, options);
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
		
		
		$rootScope.loadDs = function (parmas, fnCallback) {
			$http({
				url: 'jsonData.action',
				method: 'POST',
				params: parmas
			}).success(function (data) {
				fnCallback(data);
			});
		}

		$rootScope.goPrev = function (table) {
			if (table.pageNum <= 1)
				return;
			table.pageNum--;
			table.load();
        }

        $rootScope.goNext = function (table) {
			if (table.pageNum == table.totalPage)
				return;

			table.pageNum++;
			table.load();
        }
		
		$rootScope.getDatasource = function(pageMeta, id){
			for(var i in pageMeta.datasources){
				if(pageMeta.datasources[i].id == id){
					return pageMeta.datasources[i];
				}
			}
			return undefined;
		}
		
		$rootScope.loadPageMeta = function (pageId) {
			var deferred = $q.defer();
			$http({
				url: 'jsonData.action',
				method: 'POST',
				params: {
					collection: 'page_meta',
					method: 'find',
					selector: {
						'pageId': pageId
					}
				}
			}).success(function (data) {
				if (data.rows) {
					 deferred.resolve(data.rows[0]);
				}
			}).error(function(msg, code) {
            	deferred.reject(msg);
         	});
			
			
			return deferred.promise;
		}


		$rootScope.logout = function () {
			$http({
				url: 'logout.action',
				method: 'POST',
				headers: {
					'Content-Type': 'UTF-8'
				},
				params: {
				}
			}).success(function (data) {
				window.location = data.url;
			});
		}
	})


    global.app = app;

})(window);



