angular.module('app.dashboard', [])
.controller('DashboardCtrl', function($scope, $http, $ionicModal) {
  if(localStorage.getItem('fs_token')){// adding token to the headers
      $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('fs_token');
  }
  $scope.storageusername=localStorage.getItem("fs_username");
  $scope.users= JSON.parse(localStorage.getItem('fs_users'));

  $scope.doRefresh = function() {
        /* users refresh: */
        console.log("users refresh");
        $http.get(urlapi + 'users')
        .success(function(data, status, headers, config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.users = data; // for UI
            localStorage.setItem('fs_users', JSON.stringify($scope.users));
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
});
