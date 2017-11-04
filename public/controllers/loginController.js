var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http,$window) {
    $scope.submit = function() {
        $http({
            method : "POST",
            url : '/checkLogin',
            data : {

                "email"		:$scope.email,
                "password": $scope.password

            }
        }).success(function(data) {
            $scope.test=data.statuscode;
            if (data.statuscode==401) {
                $scope.invalid_login = true;
                $scope.validlogin = false;
            }
            else
            {
                $window.location = '/home';


            }
        }).error(function(error) {
            console.log("2");
        });
    };
})