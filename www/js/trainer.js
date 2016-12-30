angular.module('app.trainer', [])

.controller('TrainerCtrl', function($scope, $stateParams, $http) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.trainer={};
  $http.get(urlapi + 'trainers/'+ $stateParams.trainerid)
    .then(function (data) {
        $scope.trainer=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });
});
