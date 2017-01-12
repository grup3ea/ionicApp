angular.module('app.search', [])
.controller('SearchCtrl', function($scope, $http, $ionicModal, $stateParams) {


  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));

  $scope.searchstring=$stateParams.searchstring;
    $scope.searchresults={};
    $http.get(urlapi + 'search/'+ $stateParams.searchstring)
      .then(function (data) {
      console.log(data.data);
          $scope.searchresults=data.data;
      }, function (data, status) {
          console.log('data error');
          console.log(status);
          console.log(data);
      })
      .then(function (result) {
          //users = result.data;
      });

      /* searchbox */
      $scope.searchstring={
          value: $stateParams.searchstring
      };
      $scope.goSearch = function(){
          console.log($scope.searchstring);
        window.location = "#/app/search/"+ $scope.searchstring.value;
      };/* end of doSearch */
      /* /searchbox */
});
