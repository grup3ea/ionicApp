var urlapi="http://localhost:3005/api/";
//var urlapi="http://147.83.7.158:3005/api/";

angular.module('app.globalCtrl', ['ng.deviceDetector'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading, deviceDetector) {

  var vm = this;
  vm.data = deviceDetector;
  var ip;

  var json = 'http://ipv4.myexternalip.com/json';
  $http.get(json).then(function(result) {
    console.log(result.data.ip)
  }, function(e) {
    alert("error");
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
