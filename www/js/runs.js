angular.module('app.runs', [])
.controller('RunsCtrl', function($scope, $http, $ionicModal, $stateParams) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user=[];
  $scope.doRefresh=function(){
      $http.get(urlapi + "/runs/byUserId/" + $stateParams.userid)
        .then(function (data) {
            console.log('data success');
            console.log(data); // for browser console
            $scope.user=data.data;
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        });
    };
    $scope.doRefresh();
});
