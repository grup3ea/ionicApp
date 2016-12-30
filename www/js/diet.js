angular.module('app.diet', [])
.controller('DietCtrl', function($scope, $http, $ionicModal, $stateParams) {

  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.diet={};
  $http.get(urlapi + 'diets/'+ $stateParams.dietid)
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.diet=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });
});
