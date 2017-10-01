var search = angular.module('search', []);
//defining the login controller
search.controller('search', function($scope, $http,$window,$location) {
    $scope.submit = function() {

        $http({
            method : "POST",
            url : '/search',
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