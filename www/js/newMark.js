angular.module('app.newMark', [])
.controller('NewMarkCtrl', function($scope, $http, $ionicModal, $rootScope) {

    $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
    $scope.newMark={};

      $scope.sendNewMark = function(){
          $http({
              url: urlapi + 'users/newMark',
              method: "POST",
              data: $scope.newMark
          })
          .then(function (response) {
              console.log(response);
              window.location = "#/app/marks/" + $scope.storageuser._id;
          },
          function () {
              console.log('Failed on adding mark to your marks');
          });
    };/* end of sendNewMark */

    $scope.cancel = function(){
        window.history.back();
    };
});
