(function () {
'use strict';

angular.module('ass1App', [])

  .controller('LunchCheckController', function($scope) {

    $scope.lunch = "";

    $scope.lunchCheck = function() {
      var lunchResult = checkLunch($scope.lunch);
      $scope.lunchMessage = lunchResult;

    };

    function checkLunch(string) {
      $scope.lunchMenuArr = $scope.lunch.split(',');
      $scope.menuSize = $scope.lunchMenuArr.length;
      var lunchCheckResult = "";

      if ($scope.menuSize == 0) {
        lunchCheckResult = "Please enter data first";
      } else if ($scope.menuSize <= 3) {
        lunchCheckResult = "Enjoy!";
      } else {
        lunchCheckResult = "Too much!";
      }

      return lunchCheckResult;
    }



  });





})();
