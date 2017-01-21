angular.module('app.marks', [])
.controller('MarksCtrl', function($scope, $http, $ionicModal, $filter,
                        $stateParams, $ionicPopup, $rootScope) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user = {};
  $scope.user = {};
  $scope.doRefresh=function(){
      $http.get(urlapi + 'users/' + $stateParams.userid)
      .then(function (data) {
          console.log('data success');
          console.log(data); // for browser console
          $scope.user = data.data; // for UI
          $scope.$broadcast('scroll.refreshComplete');//refresher stop

      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
          $scope.$broadcast('scroll.refreshComplete');//refresher stop
      })
      .then(function (result) {
      });
  };
  $scope.doRefresh();
  $scope.orderByMe = function(x) {
    $scope.orderBy = x;
  };
  $scope.showGraphs = function(mark){
      localStorage.setItem("fs_app_selectedMark", JSON.stringify(mark));
      window.location="#/app/markGraphs/" + mark._id;
  };

  $scope.selectedMark={};
  $scope.showPopupAddDayToMark = function(mark) {
      $scope.newDay = {};
      $scope.selectedMark=mark;

      // An elaborate, custom popup
      var titlePopup = $ionicPopup.show({
          template: '<input ng-model="newDay.value">',
          title: 'Add the new value to the day mark',
          subTitle: '',
          scope: $scope,
          buttons: [
              { text: 'Cancel' },
                  {
                      text: '<b>Add!</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                          if (!$scope.newDay.value) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                      } else {
                          return $scope.newDay;
                      }
                  }
              }
          ]
      });

      titlePopup.then(function(res) {
          console.log(res);
          if(res)
          {
              $scope.sendAddDayToMark(res);
          }
      });
    };
    $scope.sendAddDayToMark = function(newDay){
        console.log(newDay);
        $http({
            url: urlapi + 'users/marks/' + $scope.selectedMark._id + '/addDayToMark',
            method: "POST",
            data: newDay
        })
        .then(function (data) {
              console.log(data);
              $scope.user.marks = data.data; // for UI
            },
            function () {
                console.log('Failed on adding mark to your marks');
            });
  };/* end of sendNewMark */


  $scope.showPopupDeleteMark = function(mark) {
      console.log(mark.title);
      $scope.selectedMark=mark;

      // An elaborate, custom popup
      var titlePopup = $ionicPopup.confirm({
         title: 'Delete mark',
         template: 'Are you sure you want to delete mark <b>' + mark.title + '</b>?'
       });

      titlePopup.then(function(res) {
          console.log(res);
          if(res)
          {
              console.log(mark);
              $http({
                  url: urlapi + 'users/marks/' + mark._id,
                  method: "Delete"
              })
              .then(function (data) {
                  // success
                  console.log("response: ");
                  console.log(data.data);
                  console.log('Mark deleted!');
                  $scope.user = data.data; // for UI
              },
              function (response) {
                  console.log('Failed on deleting mark');
              });
          }
      });
    };
});
