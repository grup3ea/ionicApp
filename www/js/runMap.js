angular.module('app.runMap', ['ngMap'])
.controller('RunMapCtrl', function($scope, $http, $ionicModal, $filter,
                                $ionicLoading, $stateParams, NgMap) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.run={};
  $scope.centerPos={
      lat: 0,
      long: 0
  };
  var vm = this;
  vm.run={
      name: "polyline",
      path: [[]]
  };
  $http.get(urlapi + "runs/byRunId/" + $stateParams.runid)
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.run=data.data;

        /* map */
        vm.run={
            name: "polyline",
            path: []
        };
        for(var i=0; i<$scope.run.positions.length; i++)
        {
            vm.run.path.push([$scope.run.positions[i].lat, $scope.run.positions[i].long]);
        }
        $scope.centerPos.lat=$scope.run.positions[0].lat;
        $scope.centerPos.long=$scope.run.positions[0].long;

    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    });
});
