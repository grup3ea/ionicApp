angular.module('app.training', [])
.controller('TrainingCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $http.get(urlapi + 'users/'+ $scope.storageuser._id)
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        //$scope.trainers = data.data; // for UI
        //localStorage.setItem('fs_web_trainers', JSON.stringify($scope.trainers));
        localStorage.setItem("fs_app_userdata", JSON.stringify(data.data));
        $scope.storageuser=data.data;
        $scope.$broadcast('scroll.refreshComplete');//refresher stop
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });
});
