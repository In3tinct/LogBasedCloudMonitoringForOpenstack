
var app=angular.module('cinderApp', []);


app.controller('cinderController',function($scope,$http) {

    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchcinder"
        }).success(function(data){
            $scope.data=data;
        })
    }, 2000);

});


