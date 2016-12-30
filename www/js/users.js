angular.module('app.users', [])
.controller('UsersCtrl', function($scope, $http, $ionicModal) {
  $scope.users= {}
  $scope.doRefresh = function() {
        /* users refresh: */
        console.log("users refresh");
        $http.get(urlapi + 'users')
        .success(function(data, status, headers, config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.users = data; // for UI
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .then(function(result){
            users = result.data;
        });
    };
    $scope.doRefresh();
});
