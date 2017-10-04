var app=angular.module('homeApp', []);


app.controller('homeController',function($scope,$http) {

    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchInfoForHomePage"
        }).success(function(data){
            $scope.data=data;
        })
    }, 5000);

});