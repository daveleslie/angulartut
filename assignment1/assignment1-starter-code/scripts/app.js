(function () {
    'use strict';

    angular.module('ass1App', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunch = "";
        $scope.lunchCheck = function() {
            //var lunchResult = checkLunch($scope.lunch);
            $scope.lunchMessage = checkLunch($scope.lunch)

        };

        function checkLunch(string) {
            var lunchMenuArr = $scope.lunch.split(',');
            var cleanArr = [];
            for (var i = 0; i < lunchMenuArr.length; i++ ) {
                if (!(lunchMenuArr[i].length == 0)) {
                    cleanArr.push(lunchMenuArr[i]);
                }
            }
            var menuSize = cleanArr.length;
            var lunchCheckResult = "";
            if (menuSize == 0) {
                lunchCheckResult = "Please enter data first";
            }   else if (menuSize <= 3) {
                lunchCheckResult = "Enjoy!";
            }   else {
                lunchCheckResult = "Too much!";
            }
            return lunchCheckResult;
        }
    }

})();
