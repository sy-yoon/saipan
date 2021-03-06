(function (global) {
    var app = angular.module('app', ['ngRoute']);
    app.config(function ($routeProvider, $controllerProvider, $httpProvider) {
		// for dynamic controller 
		app.registerCtrl = $controllerProvider.register;

		// route cofiguation
		$routeProvider.
            when('/', { templateUrl: '/pages/main.html' }).
            when('/pages/:name*', {
				templateUrl: function (a) {
					var parts = a.name.split('/');
					var page = '', part;
					for (var i in parts) {
						part = parts[i].split("=");
						if (part[1] != undefined) continue;
						if (parts[i] == '') continue;
						page += parts[i] + '/';
					}
					var page = page.substr(0, page.length - 1);

					return '/pages/' + page + '.html';
				}
			}).
			when('/mpage/:pageId', {templateUrl: '/pages/meta/mpage.html'}).
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

    app.run(function ($rootScope, $http, $document) {
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
		
		/* DBMS Object Config */
		$rootScope.config = {
			dbmsObject: {}
		}

		$http({
			url: 'jsonData.action',
			method: 'POST',
			headers: {
				'Content-Type': 'UTF-8'
			},
			params: {
				collection: 'dbms_object',
				method: 'find'
			}
		}).success(function (data) {
			$rootScope.config.dbmsObject = data.rows;
		});

		$rootScope.getDatasource = function(pageMeta, id){
			for(var i in pageMeta.datasources){
				if(pageMeta.datasources[i].id == id){
					return pageMeta.datasources[i];
				}
			}
			return undefined;
		}
		
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

		$rootScope.pageMeta = {}
		$rootScope.loadPageMeta = function (pageId) {
			$http({
				url: 'jsonData.action',
				method: 'POST',
				params: {
					collection: 'page_meta',
					method: 'find',
					selector: {
						PAGE_ID: pageId
					}
				}
			}).success(function (data) {
				if (data.rows) {
					$rootScope.pageMeta = data.rows[0];
				}
			});
		}
	})


    global.app = app;

})(window);



