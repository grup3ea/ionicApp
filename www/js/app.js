// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var urlapi = "http://localhost:3005/api/";
//var urlapi="http://147.83.7.158:3005/api/";


angular.module('starter', [
'ionic',
'cloudinary',
'app.globalCtrl',
'app.menu',
'app.footerMenu',
'app.main',
'app.dashboard',
'app.notifications',
'app.training',
'app.routine',
'app.eating',
'app.diet',
'app.network',
'app.users',
'app.user',
'app.points',
'app.marks',
'app.trainer',
'app.trainersSearcher',
'app.newPublication'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "dr9eawlpy")
      .set("upload_preset", "wbb0h4me");
}])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })
  .state('app.main', {
      url: '/main',
      views: {
        'menuContent': {
          templateUrl: 'templates/main.html',
          controller: 'MainCtrl'
        }
      }
    })
  .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })
    .state('app.notifications', {
        url: '/notifications',
        views: {
          'menuContent': {
            templateUrl: 'templates/notifications.html',
            controller: 'NotificationsCtrl'
          }
        }
      })
    .state('app.network', {
      url: '/network',
      views: {
        'menuContent': {
          templateUrl: 'templates/network.html',
          controller: 'NetworkCtrl'
        }
      }
    })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersCtrl'
        }
      }
    })

  .state('app.user', {
    url: '/user/:userid',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
      }
    }
  })
  .state('app.points', {
    url: '/points/:userid',
    views: {
      'menuContent': {
        templateUrl: 'templates/points.html',
        controller: 'PointsCtrl'
      }
    }
  })
  .state('app.marks', {
    url: '/marks/:userid',
    views: {
      'menuContent': {
        templateUrl: 'templates/marks.html',
        controller: 'MarksCtrl'
      }
    }
  })
  .state('app.trainer', {
    url: '/trainer/:trainerid',
    views: {
      'menuContent': {
        templateUrl: 'templates/trainer.html',
        controller: 'TrainerCtrl'
      }
    }
  })
  .state('app.trainersSearcher', {
    url: '/trainersSearcher',
    views: {
      'menuContent': {
        templateUrl: 'templates/trainersSearcher.html',
        controller: 'TrainersSearcherCtrl'
      }
    }
  })
  .state('app.training', {
    url: '/training',
    views: {
      'menuContent': {
        templateUrl: 'templates/training.html',
        controller: 'TrainingCtrl'
      }
    }
  })
  .state('app.routine', {
    url: '/routine/:routineid',
    views: {
      'menuContent': {
        templateUrl: 'templates/routine.html',
        controller: 'RoutineCtrl'
      }
    }
  })

  .state('app.eating', {
    url: '/eating',
    views: {
      'menuContent': {
        templateUrl: 'templates/eating.html',
        controller: 'EatingCtrl'
      }
    }
  })
  .state('app.diet', {
    url: '/diet/:dietid',
    views: {
      'menuContent': {
        templateUrl: 'templates/diet.html',
        controller: 'DietCtrl'
      }
    }
  })
  .state('app.newPublication', {
    url: '/newPublication',
    views: {
      'menuContent': {
        templateUrl: 'templates/newPublication.html',
        controller: 'NewPublicationCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  if((localStorage.getItem("fs_app_token"))&&(JSON.parse(localStorage.getItem("fs_app_userdata"))!="null")&&(JSON.parse(localStorage.getItem("fs_app_userdata"))!=null))
  {
    if(window.location.hash=="#/app/login")
    {
      window.location='#/app/main';
    }
    $urlRouterProvider.otherwise('/app/main');
  }else{
      if((window.location!="#/app/login")||(window.location!="#/app/signup"))
      {
        localStorage.removeItem("fs_app_token");
        localStorage.removeItem("fs_app_userdata");
        window.location="#/app/login";
        $urlRouterProvider.otherwise('/app/login');
      }
  }
})

.factory('httpInterceptor', function httpInterceptor ($q, $window, $location) {
  return {
    request: function(config) {
      return config;
    },

    requestError: function(config) {
      return config;
    },

    response: function(res) {
      return res;
    },

    responseError: function(res) {
      return res;
    }
  }
})
.factory('api', function ($http) {
	return {
		init: function () {
      $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("fs_app_token");
      $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("fs_app_token");
		}
	};
})
.run(function (api) {
	api.init();
});
