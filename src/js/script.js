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
        $scope.signatureOne = '';
        $scope.scrollToTopOne = '';
        $scope.socialIconsOne = '';
        $scope.magnificPopupOne = '';
        $scope.countdownTimerOne = '';
        $scope.giveABeerOne = '';

        var abUrl = String(document.location.href);

        if (abUrl.indexOf('localhost') > 0) {
            $scope.rootPath = 'http://localhost:8888/wordpress';

        } else {
            $scope.rootPath = 'http://server.admin-builder.com';
        }
        $scope.updatePage = function() {

          $scope.signatureOne = '.....';
          $scope.scrollToTopOne = '.....';
          $scope.socialIconsOne = '.....';
          $scope.magnificPopupOne = '.....';
          $scope.countdownTimerOne = '.....';
          $scope.giveABeerOne = '.....';
            $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: $scope.rootPath + '/wp-json/plugins/stats',
            }).then(function successCallback(response) {

              $scope.signatureOne = response.data.signatureOne;
              $scope.scrollToTopOne = response.data.scrollToTopOne;
              $scope.socialIconsOne = response.data.socialIconsOne;
              $scope.magnificPopupOne = response.data.magnificPopupOne;
              $scope.countdownTimerOne = response.data.countdownTimerOne;
              $scope.giveABeerOne = response.data.giveABeerOne;
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
