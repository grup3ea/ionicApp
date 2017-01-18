angular.module('app.follows', [])
.controller('FollowsCtrl', function($scope, $http, $ionicModal, $stateParams) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user = {};
  $http.get(urlapi + 'users/' + $stateParams.userid + '/network')
      .then(function (data) {
          console.log('data success');
          console.log(data); // for browser console
          $scope.user = data.data; // for UI
      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      })
      .then(function (result) {
      });

});
