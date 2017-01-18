angular.module('app.user', [])

.controller('UserCtrl', function($scope, $stateParams, $http, $ionicPopup, $ionicModal) {
  $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
  $scope.user={};
  $scope.doRefresh=function(){
      $http.get(urlapi + 'users/'+ $stateParams.userid)
        .then(function (data) {
            $scope.user=data.data;
            console.log("user getted:");
            console.log($scope.user);
            if($scope.user._id==$scope.storageuser._id)
            {
                localStorage.setItem("fs_app_userdata", JSON.stringify(data.data));
                $scope.storageuser=data.data;
            }
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        }, function (data, status) {
            console.log('data error');
            console.log(status);
            console.log(data);
            $scope.$broadcast('scroll.refreshComplete');//refresher stop
        });
    };
    $scope.doRefresh();


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
    $scope.userInPetitions = function() {
        if($scope.user.clientsPetitions){
            for(var i = 0, len = $scope.user.clientsPetitions.length; i < len; i++) {
                if ($scope.user.clientsPetitions[i].clientid === $scope.storageuser._id){
                    if($scope.user.clientsPetitions[i].state==="pendent")
                    {
                        return i;
                    }
                }
            }
        }
        return -1;
    };
    $scope.userInClients = function() {
        if($scope.user.clients){
            for(var i = 0, len = $scope.user.clients.length; i < len; i++) {
                if ($scope.user.clients[i].client._id === $scope.storageuser._id){
                    return i;
                }
            }
        }
        return -1;
    };
    /*
    if (myArray[i].client._id === searchTerm){
        return i;
    }
    */
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
        },
        function () {

              console.log('Failed on unfollowing user');
        });
    };



    $scope.deletePublication = function (ev, publicationid) {
        // Appending dialog to document.body to cover sidenav in docs app
        console.log("deletePublication()" + publicationid);

        //$scope.showConfirm = function() {
          var confirmPopup = $ionicPopup.confirm({
            title: 'Delete publication?',
            template: 'Are you sure you want to delete this publication?'
          });

          confirmPopup.then(function(res) {
              console.log("confirmed");
            if(res) {
                $http({
                    url: urlapi + 'publications/' + publicationid,
                    method: "Delete"
                })
                    .then(function (response) {
                            // success
                            console.log("response: ");
                            console.log(response.data);
                            console.log('Publication deleted!');
                            $scope.doRefresh();
                        },
                        function (response) {
                            console.log('Failed on deleting publication');
                        });
            } else {
              console.log('Operation canceled');
            }
          });
        //};
    };/* end of delete publication */


    $scope.sendMessage = function(ev) {
        $http({
            url: urlapi + 'conversations',
            method: "POST",
            data: {"userB": $stateParams.userid}
        })
        .then(function (response) {
            // success
            console.log("response: ");
            console.log(response.data);
            window.location = "#/app/messages";
        },
        function (response) {
            toastr.error('Failed on generating new petition');
        });
    };//end of send message

    /* trainer petition */
    $ionicModal.fromTemplateUrl('templates/trainerPetition.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalTrainerPetition = modal;
    });
    $scope.closeTrainerPetition = function() {
        $scope.modalTrainerPetition.hide();
    };
    $scope.showTrainerPetition = function() {
        $scope.modalTrainerPetition.show();
    };

    $scope.newpetition={};
      $scope.sendPetition=function() {
          $http({
              url: urlapi + 'users/sendPetitionToTrainer/' + $scope.user._id,
              method: "POST",
              data: {"message": $scope.newpetition.message}
          })
          .then(function (data) {
              // success
              console.log("response: ");
              console.log(data.data);
              $scope.user=data.data;
              $scope.modalTrainerPetition.hide();
          },
          function (response) {

          });
      };//end of send petition
    /* end of trainer petition */
});
