app.controller('dbms.tables', function ($scope, $routeParams, $http) {
        $scope.subTitle = $routeParams.schemaId;
        $scope.aqBizId = $routeParams.aqBizId;
        $scope.schemaId = $routeParams.schemaId;
        $scope.params = {
                collection: 'tables',
                method: 'find-range',
                pageSize: $scope.app_config.table_entries,
                pageNum: $scope.pageNum,
                condition: {
                        SCHEMA_ID: $scope.schemaId
                }
        };


        $scope.loadTableCnt = function () {
                $scope.params.method = 'count';

                $http({
                        url: 'jsonData.action',
                        method: 'POST',
                        params: $scope.params
                }).success(function (data) {
                        $scope.totalCount = 0;
                        if (data.count) {
                                $scope.totalCount = data.count;
                        }

                        if ($scope.totalCount > 0) {
                                $scope.pageNum = 1;
                                $scope.totalPage = Math.ceil($scope.totalCount / $scope.app_config.table_entries);
                                $scope.loadTables();
                        }
                });
        }

        $scope.loadTables = function () {
                $scope.params.method = 'find-range';
                $scope.params.pageNum = $scope.pageNum;

                $http({
                        url: 'jsonData.action',
                        method: 'POST',
                        params: $scope.params
                }).success(function (data) {
                        if (data.rows) {
                                $scope.tableList = data.rows;
                        }
                });
        }

        $scope.goPrev = function () {
                if ($scope.pageNum <= 1)
                        return;
                $scope.pageNum--;
                $scope.loadTables();
        }

        $scope.goNext = function () {
                if ($scope.pageNum == $scope.totalPage)
                        return;
                $scope.pageNum++;
                $scope.loadTables();
        }

        Lib.pageInitialized(function () {
                $scope.pageNum = 0;
                $scope.totalPage = 0;
                $scope.totalCount = 0;
                $scope.loadTableCnt();

        });

});