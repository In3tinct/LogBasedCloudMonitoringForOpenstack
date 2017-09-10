
var app=angular.module('novaApp', []);


app.controller('novaController',function($scope,$http) {
    $http({
        method : "GET",
        url : "/fetchnova"
    }).success(function(data){
        alert(data);
        $scope.data=data;
    })

});


