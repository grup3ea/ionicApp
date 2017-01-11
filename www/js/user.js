angular.module('app.user', [])

.controller('UserCtrl', function($scope, $stateParams, $http) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user={};
  $http.get(urlapi + 'users/'+ $stateParams.userid)
    .then(function (data) {
        $scope.user=data.data;
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
                for(var i=0; i<$scope.user.publications.length; i++)
                {
                    if($scope.user.publications[i]._id==data.data._id)
                    {//dins de la publication en concret
                        $scope.user.publications[i]=data.data;
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
                for(var i=0; i<$scope.user.publications.length; i++)
                {
                    if($scope.user.publications[i]._id==data.data._id)
                    {//dins de la publication en concret
                        $scope.user.publications[i]=data.data;
                    }
                }
            },
            function () {

                  console.log('Failed on posting dislike publication');
            });
    };/* end of sendDislikeToPublication */


    /* followers following system */
    $scope.doFollow = function(){
        $http({
            url: urlapi + 'users/follow',
            method: "POST",
            data: {userid: $scope.user._id}
        })
        .then(function (data) {
            console.log(data.data);
            $scope.user = data.data;
            $route.reload();
        },
        function () {

              console.log('Failed on following user');
        });
    };
    $scope.doUnfollow = function(){
        $http({
            url: urlapi + 'users/unfollow',
            method: "POST",
            data: {userid: $scope.user._id}
        })
        .then(function (data) {
            console.log(data.data);
            $scope.user = data.data;
            $route.reload();
        },
        function () {

              console.log('Failed on unfollowing user');
        });
    };



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



    //TRAINER
    $scope.sendPetition = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Ask for routine')
        .textContent('Describe the petition')
        .placeholder('Hi, I want a routine to get prepared for an Ironman')
        .ariaLabel('Dog name')
        .initialValue('')
        .targetEvent(ev)
        .ok('Send Petition')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {

          //POST PETITION
          $http({
              url: urlapi + 'users/sendPetitionToTrainer/' + $scope.user._id,
              method: "POST",
              data: {"message": result}
          })
          .then(function (response) {
              // success
              console.log("response: ");
              console.log(response.data);
              $window.location = "#!/training";
          },
          function (response) {
            $mdToast.show(
               $mdToast.simple()
                  .textContent('Failed on generating new petition')
                  .position("bottom right")
                  .hideDelay(3000)
            );
          });
      }, function() {
        $mdToast.show(
           $mdToast.simple()
              .textContent('Petition canceled')
              .position("bottom right")
              .hideDelay(3000)
        );
      });
    };//end of send petition
});
