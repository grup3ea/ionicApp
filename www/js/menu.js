angular.module('app.menu', [])
.controller('MenuCtrl', function($scope, $http, $ionicModal) {

  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  console.log($scope.storageuser);
});
