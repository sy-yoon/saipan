app.controller('dbms.table', function ($scope, $routeParams, $http) {
    $scope.tableNm = $routeParams.tableNm;
    $scope.dbmsId = $routeParams.dbmsId;
    $scope.schemaId = $routeParams.schemaId;


    $scope.loadTableInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                collection: 'tables',
                method: 'find',
                condition: {
                    DBMS_ID: $scope.dbmsId,
                    SCHEMA_ID: $scope.schemaId,
                    TABLE_NAME: $scope.tableNm
                }
            }
        }).success(function (data) {
            if (data.rows && data.rows.length) {
                $scope.tableDetail = data.rows[0];
            }
        });
    }

    $scope.loadColInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                method: 'find',
                collection: 'columns',
                condition: {
                    DBMS_ID: $scope.dbmsId,
                    SCHEMA_ID: $scope.schemaId,
                    TABLE_NAME: $scope.tableNm
                }
            }
        }).success(function (data) {
            if (data.rows) {
                $scope.tableColList = data.rows;
            }
        });
    }

    $scope.loadConstInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                method: 'find',
                collection: 'columns',
                condition: {
                    DBMS_ID: $scope.dbmsId,
                    SCHEMA_ID: $scope.schemaId,
                    TABLE_NAME: $scope.tableNm
                }
            }
        }).success(function (data) {
            if (data.rows) {
                $scope.tableConsList = data.rows;
            }
        });
    }

    $scope.loadIndexInfo = function () {
        $http({
            url: 'jsonData.action',
            method: 'POST',
            params: {
                method: 'find',
                collection: 'index_columns',
                condition: {
                    DBMS_ID: $scope.dbmsId,
                    SCHEMA_ID: $scope.schemaId,
                    TABLE_NAME: $scope.tableNm
                }
            }
        }).success(function (data) {
            if (data.rows) {
                $scope.tableIdxList = data.rows;

            }
        });
    }

    Lib.pageInitialized(function () {
        $scope.loadTableInfo();
        $scope.loadColInfo();
        $scope.loadIndexInfo();
    });

});