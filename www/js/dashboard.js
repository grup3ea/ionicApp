angular.module('app.dashboard', [])
.controller('DashboardCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.doRefresh = function() {
        /* users refresh: */
        console.log("users refresh");
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
    };
    $scope.doRefresh();//pq pilli la info al anar al dashboard





    /* suggestions */
    $scope.suggestions=[];
    $http.get(urlapi + 'users/'+ $scope.storageuser._id + '/suggestions')
        .then(function (data) {
            console.log('data success');
            console.log(data);
            $scope.suggestions=data.data;
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
        });
    /* followers following system */
    $scope.doFollow = function(user){
        $http({
            url: urlapi + 'users/follow',
            method: "POST",
            data: {userid: user._id}
        })
        .then(function (data) {
            console.log(data.data);
            toastr.info("User: " + user.name + " followed");
            $route.reload();
        },
        function () {
              toastr.error('Failed on following user');
        });
    };
    /* end of suggestions */
});
