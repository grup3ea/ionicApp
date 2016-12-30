angular.module('app.routine', [])
.controller('RoutineCtrl', function($scope, $http, $ionicModal, $stateParams) {

  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.routine={};
  $http.get(urlapi + 'routines/'+ $stateParams.routineid)
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.routine=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });
});
