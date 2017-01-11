angular.module('app.network', [])

.controller('NetworkCtrl', function($scope, $stateParams, $http) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.newsfeed=[];
  $http.get(urlapi + 'publications/newsfeed')
    .then(function (data) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.newsfeed=data.data;
    }, function (data, status) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //users = result.data;
    });


    //publication likes
    $scope.arrayObjectIndexOf = function(myArray, searchTerm) {
        if(myArray){
            for(var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i] === searchTerm){
                    return i;
                }
            }
        }
        return -1;
    };
    $scope.sendLikeToPublication = function(publication, index){
      console.log(index);
      console.log("like - " + publication.title);
        $http({
            url: urlapi + 'publications/'+publication._id+'/like',
            method: "POST"
        })
        .then(function (data) {
          console.log(data.data);
                console.log('liked publication');
                for(var i=0; i<$scope.newsfeed.length; i++)
                {
                    if($scope.newsfeed[i]._id==data.data._id)
                    {//dins de la publication en concret
                        $scope.newsfeed[i]=data.data;
                    }
                }
            },
            function () {
                console.log('Failed on posting like publication');
            });
    };/* end of sendLikeToPublication */
    $scope.sendDislikeToPublication = function(publication, index){
      console.log(index);
      console.log("dislike - " + publication.title);
        $http({
            url: urlapi + 'publications/'+publication._id+'/dislike',
            method: "POST"
        })
        .then(function (data) {
          console.log(data.data);
                console.log('disliked publication');
                for(var i=0; i<$scope.newsfeed.length; i++)
                {
                    if($scope.newsfeed[i]._id==data.data._id)
                    {//dins de la publication en concret
                        $scope.newsfeed[i]=data.data;
                    }
                }
            },
            function () {

                  console.log('Failed on posting dislike publication');
            });
    };/* end of sendDislikeToPublication */



    $scope.deletePublication = function (ev, publicationid) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Delete this publication?')
            .textContent('Are you sure?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes, delete')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            $http({
                url: urlapi + 'publications/' + publicationid,
                method: "Delete"
            })
                .then(function (response) {
                        // success
                        console.log("response: ");
                        console.log(response.data);
                        console.log('Publication deleted!');
                        $route.reload();
                    },
                    function (response) {
                        console.log('Failed on deleting publication');
                    });
        }, function () {
            console.log('Operation canceled');
        });
    };/* end of delete publication */


    $scope.orderByMe = function(x) {
      $scope.orderBy = x;
    };
});
