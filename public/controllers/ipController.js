var app=angular.module('ipApp', []);


app.controller('ipController',function($scope,$http) {

    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchHorizonip"
        }).success(function(data){
            //alert(data.geolocation.ip);
            $scope.data=data;
        })
    }, 5000);

});