angular.module('app.editUser', [])
    .controller('EditUserCtrl', function ($scope, $http, $stateParams,
                                          $rootScope, $location, cloudinary, $cordovaCamera) {
        $scope.storageuser = JSON.parse(localStorage.getItem("fs_app_userdata"));
        if ($scope.storageuser._id != $stateParams.userid) {
            window.location = "#/user" + $stateParams.userid;
        }
        $scope.user = {};
        $http.get(urlapi + 'users/' + $stateParams.userid)
            .then(function (data) {
                $scope.user = data.data;
                localStorage.setItem("fs_app_userdata", JSON.stringify(data.data));
                $scope.storageuser = JSON.parse(localStorage.getItem("fs_app_userdata"));
                console.log($scope.storageuser);
            }, function (data, status) {
            })
            .then(function (result) {
            });
        $scope.updateUser = function () {
            $http({
                url: urlapi + 'users/' + $stateParams.userid,
                method: "PUT",
                data: $scope.user
            })
                .then(function (response) {
                        console.log(response);
                        $scope.user = response.data;
                        localStorage.setItem("fs_app_userdata", JSON.stringify(response.data));
                        $scope.storageuser = JSON.parse(localStorage.getItem("fs_app_userdata"));

                        window.location = "#/user/" + $scope.storageuser._id;
                    },
                    function () {
                        toastr.success('Failed on updating user');
                    });
        };

        /**Age Calculation from Birthday**/
        //$scope.storageuser.birthday = birthday; Necesitamos tener en algun sitio la variable de birthday para calcular la edad
        //$scope.user.age = calculateAge(birthday);

        $scope.calculateAge = function calculateAge(birthdate) {
            //console.log(birthdate)
            var datet = new Date(birthdate)
            //console.log(datet.getTime());
            var age = Date.now() - datet;
            var agedate = new Date(age);

            //console.log(Math.abs(agedate.getUTCFullYear() - 1970))
            age = Math.abs(agedate.getUTCFullYear() - 1970);
            return age;// birthday is a date

        };

/*        /!* cloudinary *!/
        $scope.uploadFileAvatar = function (file, index) {
            console.log(index);
            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
            $scope.user.imgfileAvatar = file;
            if (!$scope.user.imgfileAvatar) return;
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
                    $scope.user.avatar = data.url;
                    $rootScope.photos = $rootScope.photos || [];
                    data.context = {custom: {photo: $scope.title}};
                    file.result = data;
                    $rootScope.photos.push(data);
                }).error(function (data, status, headers, config) {
                    file.result = data;
                });
            }
        };
        $scope.uploadFileBackground = function (file, index) {
            console.log(index);
            var d = new Date();
            $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
            $scope.user.imgfileBackground = file;
            if (!$scope.user.imgfileBackground) return;
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
                    $scope.user.background = data.url;
                    $rootScope.photos = $rootScope.photos || [];
                    data.context = {custom: {photo: $scope.title}};
                    file.result = data;
                    $rootScope.photos.push(data);
                }).error(function (data, status, headers, config) {
                    file.result = data;
                });
            }
        };*/
        /* end of cloudinary */



        /* imgComplete per visualitzar en gran */
        $scope.showImgComplete = function(ev, urlimg) {
            console.log(urlimg);
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/user/imgComplete.tmpl.html',
                locals: {
                    urlImg: urlimg
                },
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        };
        function DialogController($scope, $mdDialog, locals) {
            console.log(locals);
            $scope.urlImg=locals.urlImg;
            $scope.storageuser = JSON.parse(localStorage.getItem("fs_app_userdata"));
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }/* end of imgComplete */


        /* add discipline to array */
        $scope.addDiscipline = function(){
            $scope.user.disciplines.push({name:""});
        };
        /* end of add discipline to array */




        $scope.chooseImageAvatar = function(){
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
                $scope.user.avatar = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
        };
        $scope.takePhotoAvatar = function(){
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
                $scope.user.avatar = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
        };
        $scope.chooseImageBackground = function(){
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
                $scope.user.background = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
        };
        $scope.takePhotoBackground = function(){
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
                $scope.user.background = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                console.log(err);
            });
        };
    });
