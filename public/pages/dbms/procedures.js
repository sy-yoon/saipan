app.registerCtrl('dbms.procedures', function ($scope, $routeParams, $http) {
        $scope.subTitle = $routeParams.schemaId;
        $scope.aqBizId = $routeParams.aqBizId;
        $scope.schemaId = $routeParams.schemaId;

        $scope.loadProcedureCnt = function () {
                $scope.params.method = 'count';

                $http({
                        url: 'jsonData.action',
                        method: 'POST',
                        params: $scope.params
                }).success(function (data) {
                        $scope.totalCount = 0;
                        
                        if (data.count) {
                                $scope.procTbl.totalCount = data.count;
                        }

                        if ($scope.procTbl.totalCount > 0) {
                                $scope.procTbl.pageNum = 1;
                                $scope.procTbl.totalPage = Math.ceil($scope.procTbl.totalCount / $scope.app_config.table_entries);
                                $scope.loadPorcedures();
                        }
                });
        }

        $scope.loadPorcedures = function () {
                $scope.params.method = 'find-range';
                $scope.params.pageNum = $scope.procTbl.pageNum;

                $scope.datasource($scope.params, function (data) {
                        if (data.rows) {
                                $scope.procedureList = data.rows;
                        }
                });
        }

        Lib.pageInitialized(function () {
                $scope.procTbl = {
                        pageNum: 0,
                        totalPage: 0,
                        totalCount: 0,
                        load: $scope.loadPorcedures
                };
        
                $scope.params = {
                        collection: 'procedures',
                        method: 'find-range',
                        pageSize: $scope.app_config.table_entries,
                        pageNum: $scope.procTbl.pageNum,
                        selector: {
                                SCHEMA_ID: $scope.schemaId
                        }
                };
                
                $scope.loadPageMeta('1');
                $scope.loadProcedureCnt();
        });

});