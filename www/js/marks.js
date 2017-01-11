angular.module('app.marks', [])
.controller('MarksCtrl', function($scope, $http, $ionicModal, $filter, $stateParams) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user = {};
  $scope.user = {};
  $http.get(urlapi + 'users/' + $stateParams.userid)
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

  $scope.orderByMe = function(x) {
    $scope.orderBy = x;
  };
});
