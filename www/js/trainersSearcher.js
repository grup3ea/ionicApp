angular.module('app.trainersSearcher', [])
.controller('TrainersSearcherCtrl', function($scope, $http, $ionicModal) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.disciplines=[
    {
      name: "bodybuilding"
    },
    {
      name: "running"
    },
    {
      name: "ironman"
    }
  ];
  $scope.trainers={};
  $scope.searchDiscipline = function(discipline){
      $scope.choosenDiscipline=discipline.name;
      console.log($scope.choosenDiscipline);
      $http({
          url: urlapi + 'trainers/searchByDiscipline/' + discipline.name,
          method: "GET"
      })
      .then(function(data) {
              // success
              console.log("response: ");
              console.log(data.data);
              $scope.trainers=data.data;
      },
      function(response) { // optional
              // failed
              console.log(response);
      });
  };

});
