angular.module('app.markGraphs', ['chart.js'])
.controller('MarkGraphsCtrl', function($scope, $http, $ionicModal, $filter,
                        $stateParams, $ionicPopup, $rootScope) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.mark=JSON.parse(localStorage.getItem("fs_app_selectedMark"));
  console.log($scope.mark);
  /* aquí generem la data de la gràfica */
  console.log("generant data de gràfic");
  $scope.data=[];
  $scope.labels=[];
  for(var i=0; i<$scope.mark.days.length; i++)
  {
      $scope.data.push($scope.mark.days[i].value);
      $scope.labels.push($filter('date')($scope.mark.days[i].date, 'dd.MM.y'));
  }
  console.log("algoritme de generació de la data del gràfic completat");
  console.log($scope.data);
  console.log($scope.labels);
  /* end of generació de les dades de la gràfica */
});
