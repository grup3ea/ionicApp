angular.module('app.users', [])
.controller('UsersCtrl', function($scope, $http, $ionicModal) {
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
    /*$scope.users=[
      {
        username: "user1",
        avatar: "tiger",
        description: "hi, i'm user1, this is my description"
      },
      {
        username: "user2",
        avatar: "toucan",
        description: "hi, i'm user2, I'm running now"
      },
      {
        username: "user3",
        avatar: "owl",
        description: "here user3, I'm swimming now"
      }
    ];*/
});
