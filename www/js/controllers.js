var urlapi="http://localhost:3005/api/";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $window, $ionicLoading) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.signupData= {};

  $scope.storageusername=localStorage.getItem("fs_userdata");
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalLogin = modal;
  });
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSignup = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };
  $scope.closeSignup = function() {
    $scope.modalSignup.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modalLogin.show();
  };
  $scope.signup = function() {
    $scope.modalSignup.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $http({
        url: urlapi + 'login',
        method: "POST",
        data: $scope.loginData
    })
    .then(function(response) {
            // success
            console.log("response: ");
            console.log(response.data);
            if(response.data.success==true)
            {
                console.log("login successful");
                localStorage.setItem("c_username", $scope.loginData.username);
                localStorage.setItem("c_token", response.data.token);
                localStorage.setItem("c_userid", response.data.userid);
                localStorage.setItem("c_avatar", response.data.avatar);

                localStorage.setItem("c_userdata", JSON.stringify(response.data.userdata));

                $timeout(function() {
                  $scope.closeLogin();
                  $window.location.reload(true);
                }, 1000);
            }else{
                console.log("login failed");
                $ionicLoading.show({ template: 'Login failed, user or password error.', noBackdrop: true, duration: 2000 });
            }


    },
    function(response) { // optional
            // failed
            console.log(response);
    });

  };
  $scope.doSignup = function() {
    console.log('Doing signup', $scope.signupData);
    if($scope.emptyParams($scope.signupData))
    {
      $http({
          url: urlapi + 'users',
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
    if(obj.username==undefined)
    {
      return(false);
    }
    if(obj.password==undefined)
    {
      return(false);
    }
    if(obj.mail==undefined)
    {
      return(false);
    }
    if(obj.avatar==undefined)
    {
      return(false);
    }
    return(true);
  };
  $scope.avatars=[
    "turtle",
    "cat",
    "toucan",
    "racoon",
    "tiger",
    "squirrel",
    "sheep",
    "penguin",
    "panda",
    "owl",
    "pelican",
    "whale",
    "snake",
    "mouse",
    "giraffe",
    "macaw",
    "lion",
    "llama",
    "kangaroo",
    "hen",
    "frog",
    "clown-fish",
    "chameleon",
    "octopus"
  ];
  $scope.avatarSelect = function(avat){
    $scope.signupData.avatar=avat;
    //alert($scope.signupData.avatar);
  };
  $scope.logout = function(){
      localStorage.removeItem("fs_token");
      localStorage.removeItem("fs_userdata");
      $window.location.reload(true);
  };

  /* if no logged, suggest to login */
  if(localStorage.getItem('fs_token')){// adding token to the headers
      $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem('fs_token');
  }else{
    setTimeout(function(){
      $scope.login();
    },1000);
  }
})

.controller('UsersCtrl', function($scope, $http, $ionicModal) {
  if(localStorage.getItem('c_token')){// adding token to the headers
      $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem('c_token');
  }
  $scope.doRefresh = function() {
        /* users refresh: */
        $http.get(urlapi + 'allusers')
        .success(function(data, status, headers, config){
            console.log('data success');
            console.log(data); // for browser console
            $scope.users = data; // for UI
            localStorage.setItem('fs_users', JSON.stringify($scope.users));
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .error(function(data, status, headers,config){
            console.log('data error');
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        })
        .then(function(result){
            users = result.data;
        });
    };
    $scope.users=[
      {
        username: "user1",
        avatar: "tiger",
        description: "hi, i'm user1, this is my description"
      },
      {
        username: "user2",
        avatar: "toucan",
        description: "hi, i'm user2, I'm running now"
      },
      {
        username: "user3",
        avatar: "owl",
        description: "here user3, I'm swimming now"
      }
    ]
})

.controller('UserCtrl', function($scope, $stateParams) {
});
