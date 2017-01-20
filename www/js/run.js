angular.module('app.run', [])
.controller('RunCtrl', function($scope, $http, $ionicModal, $filter,
                                $ionicLoading, $stateParams) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.run={};
  $http.get(urlapi + "/runs/byRunId/" + $stateParams.runid)
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.run=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    });
});
