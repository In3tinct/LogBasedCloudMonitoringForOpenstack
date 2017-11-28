var trace = angular.module('trace', []);
//defining the login controller
trace.controller('trace', function($scope, $http,$window,$location) {
    $scope.submit = function() {
        $http({
            method : "POST",
            url : '/trace',
            data : {

                "component" : $scope.component,
                "date": $scope.date,
                "level":$scope.level

            }
        }).success(function(data) {

            $scope.data=data;
            console.log(data);

        }).error(function(error) {


            console.log(error);
        });
    };
});