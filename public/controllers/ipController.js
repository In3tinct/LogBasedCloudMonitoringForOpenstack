var app=angular.module('ipApp', []);


app.controller('ipController',function($scope,$http) {
    var toggle=true;
    setInterval(function(){
        $http({
            method : "GET",
            url : "/fetchHorizonip"
        }).success(function(data){
            //alert(data.geolocation.ip);
            $scope.data=data;
        })
    }, 2000);

    $scope.toggle=toggle;

    $scope.hideOrshow = function() {

        return true;
    }

});