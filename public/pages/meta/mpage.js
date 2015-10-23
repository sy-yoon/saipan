app.registerCtrl('mpage', function ($scope, $routeParams, $http) {
    $http({
        url: 'jsonData.action',
        method: 'POST',
        params: {
            collection: 'page_meta',
            method: 'find',
            selector: {
                pageId: $routeParams.pageId
            }
        }
    }).success(function (data) {
        if (data.rows) {
            $scope.pageMeta = data.rows[0];
            $scope.html = $scope.pageMeta.html;
        }
    });

});