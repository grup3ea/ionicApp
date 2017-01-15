angular.module('app.notifications', [])
.controller('NotificationsCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.notifications=[];
  $http.get(urlapi + $scope.storageuser.role + 's/'+ $scope.storageuser._id + "/getNotifications")
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.notifications=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    });
});
