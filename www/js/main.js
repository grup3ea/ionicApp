angular.module('app.main', [])
.controller('MainCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

});
