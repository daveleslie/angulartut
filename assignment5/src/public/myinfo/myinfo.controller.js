(function() {
'use strict';

angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['UserService']
  function MyInfoController(UserService) {
    var ctrl = this;

    ctrl.user = UserService.getUser();
  }



})();