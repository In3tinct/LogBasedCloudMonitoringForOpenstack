
var app=angular.module('novaApp', []);


app.controller('novaController',function($scope,$http) {

    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchnova"
        }).success(function(data){
            $scope.data=data;
        })
    }, 5000);

});


