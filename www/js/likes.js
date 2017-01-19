angular.module('app.likes', [])
.controller('LikesCtrl', function($scope, $http, $ionicModal, $stateParams) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.publication = [];
  $scope.doRefresh=function(){
      $http.get(urlapi + 'publications/getById/' + $stateParams.publicationid)
      .then(function (data) {
          console.log(Date());
          console.log('data success');
          console.log(data); // for browser console
          $scope.publication = data.data; // for UI
          $scope.$broadcast('scroll.refreshComplete');//refresher stop
      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      });
  };
  $scope.doRefresh();
});
