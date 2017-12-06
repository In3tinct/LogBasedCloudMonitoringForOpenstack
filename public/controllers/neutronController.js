
var app=angular.module('neutronApp', []);


app.controller('neutronController',function($scope,$http) {
    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchneutron"
        }).success(function(data){
            $scope.data=data;
        })
    }, 2000);

});


