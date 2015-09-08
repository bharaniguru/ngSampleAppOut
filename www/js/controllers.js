angular.module('starter.controllers', [])
 
.controller('AppCtrl', function() {})
 
.controller('DeviceCtrl', function($ionicPlatform, $scope, $cordovaDevice) {
    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            // sometimes binding does not work! :/
 
            // getting device infor from $cordovaDevice
            var device = $cordovaDevice.getDevice();
            $scope.manufacturer = device.manufacturer;
            $scope.model = device.model;
            $scope.platform = device.platform;
            $scope.uuid = device.uuid;
 
         });
 
    });
})
.controller('BatteryCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaBatteryStatus) {
 
    $ionicPlatform.ready(function() {
 
        // This code never worked on my Samsung Note III
        $rootScope.$on('$cordovaBatteryStatus:status', function(result) {
            $scope.$apply(function() {
                // sometimes binding does not work! :/
                console.log(result);
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged; // bool
            });
        });
 
        // But this code works!!
        // $scope.onBatteryStatus = function(result) {
        //     $scope.batteryLevel = result.level; // (0 - 100)
        //     $scope.isPluggedIn = result.isPlugged; // bool
        // }
 
        // if (!$rootScope.batteryEvtAttached) {
        //     // prevent from registering multiple times
        //     // Ideally needs to be added in .run()
        //     // This is for the sake of example
 
        //      window.addEventListener('batterystatus', $scope.onBatteryStatus, false);
        //     $rootScope.batteryEvtAttached = true;
        // }
    });
})
.controller('CameraCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaCamera) {
    $ionicPlatform.ready(function() {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });
        }
 
    });
})
.controller('MotionCtrl', function($ionicPlatform, $scope, $timeout, $cordovaDeviceMotion) {
    $ionicPlatform.ready(function() {
        // Values @ this instance
        $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
            $scope.X = result.x;
            $scope.Y = result.y;
            $scope.Z = result.z;
            $scope.timeStamp = result.timestamp;
        }, function(err) {
            // An error occurred. Show a message to the user
            console.log(err);
        });
 
 
        // Keep watching for change in values
        // watch Acceleration
        var options = {
            frequency: 2000
        };
 
        $scope.watch = $cordovaDeviceMotion.watchAcceleration(options);
        $scope.watch.then(
            null,
            function(error) {
                // An error occurred
            },
            function(result) {
                $scope.X = result.x;
                $scope.Y = result.y;
                $scope.Z = result.z;
                $scope.timeStamp = result.timestamp;
            });
 
        $timeout(function() {
 
            $scope.watch.clearWatch();
 
            // or
 
            // $cordovaDeviceMotion.clearWatch(watch)
            // .then(function(result) {
            //   // success
            //   }, function (error) {
            //   // error
            // });
 
        }, 10000);
 
 
    });
})