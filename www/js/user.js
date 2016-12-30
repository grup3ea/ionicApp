angular.module('app.user', [])

.controller('UserCtrl', function($scope, $stateParams, $http) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user={};
  $http.get(urlapi + 'users/'+ $stateParams.userid)
    .then(function (data) {
        $scope.user=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });
});
