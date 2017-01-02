var urlapi="http://localhost:3005/api/";
//var urlapi="http://147.83.7.158:3005/api/";

angular.module('app.globalCtrl', ['ng.deviceDetector'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading, deviceDetector) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  vm.data = deviceDetector;
  var ip;
  //$http({method: 'JSONP', url: '//freegeoip.net/json/?callback'})
  $http.jsonp('//freegeoip.net/json/?callback=?', {jsonpCallbackParam: 'callback'})
  .success(function(data, success) {
      ip = JSON.stringify(data);
      console.log(ip);
  })
  .error(function(data, success){
    console.log("error getting json of ip info");
    console.log(data);
    console.log(success);
  });

  console.log("userAgent: " + vm.data.raw.userAgent);
  $scope.loginData = {};
  $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);
      $scope.loginData.userAgent=vm.data.raw.userAgent;//aquí li afegin el userAgent al post del loginData
      $scope.loginData.os=vm.data.os;
      $scope.loginData.browser=vm.data.browser;
      $scope.loginData.device=vm.data.device;
      $scope.loginData.os_version=vm.data.os_version;
      $scope.loginData.ip = ip;
      $scope.loginData.browser_version=vm.data.browser_version;
      $http({
          url: urlapi + $scope.loginData.role+ 's/login',
          method: "POST",
          data: $scope.loginData
      })
      .then(function (response) {
      // success
      console.log("response: ");
      console.log(response.data);
      if (response.data.success == true) {
        console.log("login successful. Response.data: ");
              console.log(response.data);
              if (response.data.success == true)
              {
                  localStorage.setItem("fs_app_token", response.data.token);
                  localStorage.setItem("fs_app_userdata", JSON.stringify(response.data.user));
                  window.location.reload();
              }
      } else {
        console.log("login failed");
        $ionicLoading.show({ template: 'Login failed, user or password error.', noBackdrop: true, duration: 2000 });
      }
    },
    function (response) { // optional
        // failed
        console.log(response);
    });
  };
  $scope.doSignup = function() {
    $scope.signupData.role="client";
    console.log('Doing signup', $scope.signupData);
    if($scope.emptyParams($scope.signupData))
    {
      $http({
          url: urlapi + 'register',
          method: "POST",
          data: $scope.signupData
      })
      .then(function(response) {
              // success
              console.log("response: ");
              console.log(response.data);
              $scope.loginData.username=$scope.signupData.username;
              $timeout(function() {
                $scope.closeSignup();
                $scope.login();
              }, 1000);

      },
      function(response) { // optional
              // failed
            $ionicLoading.show({ template: 'Username already taken', noBackdrop: true, duration: 2000 });
      });
    }else{
      $ionicLoading.show({ template: 'First complete all parameters', noBackdrop: true, duration: 2000 });
    }

  };
  $scope.emptyParams = function(obj){
    if(obj.name==undefined)
    {
      return(false);
    }
    if(obj.password==undefined)
    {
      return(false);
    }
    if(obj.email==undefined)
    {
      return(false);
    }
    if(obj.avatar==undefined)
    {
      return(false);
    }
    return(true);
  };

});
