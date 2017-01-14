angular.module('app.menu', [])
.controller('MenuCtrl', function($scope, $http, $ionicModal) {

  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  console.log($scope.storageuser);
  $scope.logout = function () {
      localStorage.removeItem("fs_app_token");
      localStorage.removeItem("fs_app_userdata");
      window.location = "/";
  };

  var sidenavImg="img/sidenav/";
  $scope.options = [
      {
          title: "Main",
          description: "description",
          link: "#/app/main",
          icon: sidenavImg + "dashboard.png"
      },
      {
          title: "Dashboard",
          description: "description",
          link: "#/app/dashboard",
          icon: sidenavImg + "dashboard.png"
      },
      {
          title: "Notifications",
          description: "description",
          link: "#/app/notifications",
          icon: "img/notification.png"
      },
      {
          title: "Network",
          description: "description",
          link: "#/app/network",
          icon: sidenavImg + "network.png"
      },
      {
          title: "Training",
          description: "description",
          link: "#/app/training",
          icon: sidenavImg + "training.png"
      },
      {
          title: "Diet",
          description: "description",
          link: "#/app/eating",
          icon: sidenavImg + "diet.png"
      },
      {
          title: "Settings",
          description: "description",
          link: "#/app/settings",
          icon: sidenavImg + "settings.png"
      }
  ];


  /*if(localStorage.getItem('fs_app_token')){// user logged

  }else{
    window.location="#/app/login";
}*/
});
