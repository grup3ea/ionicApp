angular.module('app.message', [])
.controller('MessageCtrl', function($scope, $http, $ionicModal, $filter, $stateParams) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.conversations = [];
  $scope.conversation = {};
  $scope.doRefresh=function(){
      $http.get(urlapi + 'conversations')
      .then(function (data) {
          console.log(Date());
          console.log('data success');
          console.log(data); // for browser console
          $scope.conversations = data.data; // for UI
          $scope.conversation=$filter('filter')($scope.conversations, $stateParams.conversationid, true)[0];
          $scope.$broadcast('scroll.refreshComplete');//refresher stop
      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      });
  };
  $scope.doRefresh();

  $scope.newMessage={};
  $scope.sendMessage = function(){
      $http({
          url: urlapi + 'conversations/' + $stateParams.conversationid,
          method: "POST",
          data: $scope.newMessage
      })
      .then(function (data) {
            console.log(data);
              //toastr.success('message sent');
              $scope.conversations = data.data; // for UI
              $scope.conversation=$filter('filter')($scope.conversations, $stateParams.conversationid, true)[0];
              $scope.newMessage={};
          },
          function () {
              toastr.error('Failed on sending message');
          });
  };/* end of sendNewMessage */
});
