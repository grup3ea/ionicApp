angular.module('app.messages', [])
.controller('MessagesCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.conversations = [];
  $scope.doRefresh=function(){
      $http.get(urlapi + 'conversations')
      .then(function (data) {
          console.log(Date());
          console.log('data success');
          console.log(data); // for browser console
          $scope.conversations = data.data; // for UI
          $scope.selectedConversation=$scope.conversations[$scope.indexSelectedConversation];
          $scope.$broadcast('scroll.refreshComplete');//refresher stop
      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      });
  };
  $scope.doRefresh();
});
