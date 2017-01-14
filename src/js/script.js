(function() {
    //debug variable
    var debug = false;
    //The main module
    var slo = angular.module('slo', ['ui.bootstrap', 'ngAnimate', 'ngStorage']);
    // pcs.run(function($rootScope, $templateCache) {
    //     $rootScope.$on('$viewContentLoaded', function() {
    //         $templateCache.removeAll();
    //     });
    // });
    if (debug) {
        console.log('Module slo initiated');
    }

    var mainCtrl = slo.controller('mainCtrl', ['$scope', '$log', '$http', '$localStorage', function($scope, $log, $http, $localStorage) {
        if (debug) {
            console.log('inside controller');
        }
        $scope.countdownTimerOne = '';

        var abUrl = String(document.location.href);

        if (abUrl.indexOf('localhost') > 0) {
            $scope.rootPath = 'http://localhost:8888/wordpress';

        } else {
            $scope.rootPath = 'http://server.admin-builder.com';
        }
        $scope.updatePage = function() {

          $scope.ctoTotal = '...';
          $scope.ctoActive = '...';
          $scope.rtaTotal = '...';
          $scope.rtaActive = '...';

          $scope.totalDownloads = '...';
          $scope.totalActive = '...';
            $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: $scope.rootPath + '/wp-json/plugins/stats',
            }).then(function successCallback(response) {

              $scope.ctoTotal = response.data.cto.downloaded;
              $scope.ctoActive = response.data.cto.active;
              $scope.rtaTotal = response.data.rta.downloaded;
              $scope.rtaActive = response.data.rta.active;

              $scope.totalDownloads = $scope.ctoTotal + $scope.rtaTotal;
              $scope.totalActive = $scope.ctoActive + $scope.rtaActive;
                //generate charts

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                return false;
            });

        };
        $scope.updatePage();

    }]);
})();
