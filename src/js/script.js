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
        $scope.totalUsers = '';
        $scope.latestUser = '';
        $scope.rootPath = '';
        $scope.abLoginCount = '';
        var abUrl = String(document.location.href);

        if (abUrl.indexOf('localhost') > 0) {
            $scope.rootPath = 'http://localhost:8888/wordpress';

        } else {
            $scope.rootPath = 'http://server.admin-builder.com';
        }
        $scope.updatePage = function() {

            $scope.totalUsers = '.....';
            $scope.abLoginCount = '.....';
            $scope.abSCount = '.....';
            $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: $scope.rootPath + '/wp-json/ab/getAdminStatus',
            }).then(function successCallback(response) {

                $scope.totalUsers = response.data.users.total_users;
                $scope.abLoginCount = response.data.abLoginCount;
                $scope.abSCount = response.data.abSCount;
                $scope.projectInfo = response.data.projectInfo;
                $scope.logintrackerInfo = response.data.logintrackerInfo;

                console.log($scope.logintrackerInfo);
                //generate charts
                loadChart($scope.projectInfo,'products_chart','Projects');
                loadChart($scope.logintrackerInfo,'login_chart','Logins');

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                return false;
            });

        };
        $scope.updatePage();




        var loadChart = function(data,canvasid,title) {

            window.chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(231,233,237)'
            };

            window.randomScalingFactor = function() {
                return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
            };
            var post_date = [];
            var nr_of_projects = [];
            console.log(data);
            data.forEach(function(item) {
              post_date.push(item.post_date);
                nr_of_projects.push(parseInt(item.nr_of_projects));
            });
            console.log(post_date);
            var maxY = getMaxOfArray(nr_of_projects);
            console.log(nr_of_projects);
            console.log(maxY);
            var config = {
                type: 'line',
                data: {
                    labels: post_date,
                    datasets: [ {
                        label: "# of "+title+" per Date registered",
                        fill: false,
                        backgroundColor: window.chartColors.blue,
                        borderColor: window.chartColors.blue,
                        data: nr_of_projects,
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: title
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                                suggestedMin: 0,

                                // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                                suggestedMax: maxY
                            }
                        }]
                    }
                }
            };
            var ctx = document.getElementById(canvasid).getContext("2d");
            window.myLine = new Chart(ctx, config);
        };



    }]);








    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

})();
