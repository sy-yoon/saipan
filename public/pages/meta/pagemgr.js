app.registerCtrl('meta.pagemgr', function ($scope, $routeParams, $http) {
    $scope.tableNm = $routeParams.tableNm;
    $scope.dbmsId = $routeParams.dbmsId;
    $scope.schemaId = $routeParams.schemaId;


    $scope.loadPageInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                collection: 'page_meta',
                method: 'find'
            }
        }).success(function (data) {
            if (data.rows && data.rows.length) {
                $scope.pageList = data.rows;
            }
        });
    }


    Lib.pageInitialized(function () {
        $scope.loadPageInfo();
    });

});