angular.module('app.newRun', ['ngCordova'])
.controller('NewRunCtrl', function($scope, $http, $ionicModal, $filter,
                                $ionicLoading, $cordovaGeolocation, $ionicPopup) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.lat;
  $scope.long;
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)

   .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.lat=lat;
      $scope.long=long;
      console.log(lat + '   ' + long);
      //$ionicLoading.show({ template: lat + " - " + long, noBackdrop: true, duration: 2000 });

   }, function(err) {
      console.log(err);
   });

   var watchOptions = {timeout : 3000, enableHighAccuracy: true};
   var watch = $cordovaGeolocation.watchPosition(watchOptions);

   watch.then(
      null,

      function(err) {
         console.log(err)
      },function(position) {
        if($scope.running==true)
        {
            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            $scope.lat=lat;
            $scope.long=long;
            console.log(lat + '' + long);
            $scope.addPosition();
        }
      }
   );
   $scope.newRun={};
   $scope.running=false;

    $scope.showPopup = function() {
        $scope.run = {};

        // An elaborate, custom popup
        var titlePopup = $ionicPopup.show({
            template: '<input ng-model="run.title">',
            title: 'Name the new run',
            subTitle: 'This name will distinguish your run',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                    {
                        text: '<b>Start!</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.run.title) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.run.title;
                        }
                    }
                }
            ]
        });

        titlePopup.then(function(res) {
        console.log(res);
        $scope.startRun(res);
        });


    };
   $scope.startRun=function(title){
       $scope.running=true;
       $scope.newRun={
           datestart: Date(),
           title: title,
           positions: []
       };
       var newPos={
           date: Date(),
           lat: $scope.lat,
           long: $scope.long
       };
       $scope.newRun.positions.push(newPos);
   };
   $scope.addPosition=function(){
       var newPos={
           date: Date(),
           lat: $scope.lat,
           long: $scope.long
       };
       $scope.newRun.positions.push(newPos);
   };
   $scope.stopRun=function(){
      $scope.running=false;
      $scope.newRun.datefinish=Date();
      console.log($scope.newRun);
      //send to api
      $http({
          url: urlapi + 'runs',
          method: "POST",
          data: {newRun: $scope.newRun}
      })
      .then(function (response) {
          console.log(response);
          window.location = "#/app/runs";

      },
      function () {
          console.log('Failed on adding post to your timeline');
      });
   };
});
