
var app=angular.module('novaApp', []);


app.controller('novaController',function($scope,$http) {

    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchnova"
        }).success(function(data){
            alert(data);
            $scope.data=data;
        })
    }, 10000);

});


