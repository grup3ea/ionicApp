angular.module('app.footerMenu', [])
.controller('FooterMenuCtrl', function($scope, $http) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

});
