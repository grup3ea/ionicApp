angular.module('app.user', [])

.controller('UserCtrl', function($scope, $stateParams, $filter) {

      $scope.storageusername=localStorage.getItem("fs_username");
      $scope.users= JSON.parse(localStorage.getItem('fs_users'));
      $scope.user = $filter('filter')($scope.users, {name: $stateParams.name}, true)[0];
});
