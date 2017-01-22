angular.module('app.newRun', ['ngCordova', 'ngMap'])
.controller('NewRunCtrl', function($scope, $http, $ionicModal, $filter,
                                $ionicLoading, $cordovaGeolocation, $ionicPopup,
                                 NgMap, $cordovaCamera) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.lat;
  $scope.long;
  $scope.lastlat;
  $scope.lastlong;
  var vm = this;
  vm.run={
      name: "polyline",
      path: [[]]
  };

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
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

   var watchOptions = {timeout : 3000, enableHighAccuracy: false};
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
           positions: [],
           distance: 0
       };
       var newPos={
           date: Date(),
           lat: $scope.lat,
           long: $scope.long,
           distance: 0
       };
       $scope.lastlat=$scope.lat;
       $scope.lastlong=$scope.long;
       $scope.newRun.positions.push(newPos);
       $scope.newRun.distance= 0;
       vm.run.path.push([$scope.lat, $scope.long]);
       console.log($scope.newRun);
       console.log($scope.lastlat);
       console.log($scope.lastlong);
   };
   $scope.addPosition=function(){
       var dist = getDistanceFromLatLonInKm($scope.lastlat, $scope.lastlong, $scope.lat, $scope.long);
       var newPos={
           date: Date(),
           lat: $scope.lat,
           long: $scope.long,
           distance: dist
       };
       $scope.lastlat=$scope.lat;
       $scope.lastlong=$scope.long;
       $scope.newRun.positions.push(newPos);
       $scope.newRun.distance=$scope.newRun.distance + dist;
       vm.run.path.push([$scope.lat, $scope.long]);
   };
   $scope.stopRun=function(){
      $scope.running=false;
      $scope.newRun.datefinish=Date();
      console.log($scope.newRun);
      var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.sourceType,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.newRun.photo = "data:image/jpeg;base64," + imageData;
          $scope.sendRun();
          }, function(err) {
          // error
          console.log(err);
          $scope.sendRun();
      });
   };
   $scope.sendRun = function(){
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


   /* distance calculation algorithm */
   function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
});
