angular.module('app.newPublication', ['ngCordova', 'ngFileUpload'])
.controller('NewPublicationCtrl', function($scope, $http, $ionicModal,
                                    $cordovaImagePicker, $cordovaCamera,
                                    Upload, cloudinary, $rootScope) {

    $scope.storageuser=JSON.parse(localStorage.getItem("fs_app_userdata"));
    $scope.newPost={};

    /* cloudinary */
      $scope.uploadFileAvatar = function(file, index){
        console.log(index);
        console.log(file);
        alert(file);
        var d = new Date();
        $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";

        $scope.newPost.imgfile = file;
        if (!$scope.newPost.imgfile) return;
          if (file && !file.$error) {
            console.log(file);
            file.upload = Upload.upload({
              url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'myphotoalbum',
                context: 'photo=' + $scope.title,
                file: file
              },
              headers: {
               'X-Access-Token': undefined
              },
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
              console.log(data.url);
              $scope.newPost.photo=data.url;
              $rootScope.photos = $rootScope.photos || [];
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
              $rootScope.photos.push(data);
            }).error(function (data, status, headers, config) {
              file.result = data;
            });
          }
      };
      /* end of cloudinary */

      $scope.sendNewPost = function(){
          $http({
              url: urlapi + 'publications',
              method: "POST",
              data: $scope.newPost
          })
          .then(function (response) {
              console.log(response);
                  window.location = "#/app/network";

              },
              function () {
                  console.log('Failed on adding post to your timeline');
              });
    };/* end of sendNewPost */
    $scope.imgUrl;
    function encodeImageUri(imageUri)
    {
         var c=document.createElement('canvas');
         var ctx=c.getContext("2d");
         var img=new Image();
         img.onload = function(){
           c.width=this.width;
           c.height=this.height;
           ctx.drawImage(img, 0,0);
         };
         img.src=imageUri;
         var dataURL = c.toDataURL("image/jpeg");
         return dataURL;
         //return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    }
    $scope.chooseImage = function(){
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.newPost.photo = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            console.log(err);
        });
    };
    $scope.takePhoto = function(){
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.sourceType,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.newPost.photo = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            console.log(err);
        });
    };
    $scope.cancel = function(){
        window.history.back();
    };
});
