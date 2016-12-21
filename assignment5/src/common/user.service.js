(function() {
'use strict';

angular.module('common')
  .service('UserService', UserService);

  UserService.$inject = ['MenuService'];
  function UserService(MenuService){
    var service = this;

    service.user = {};

    service.saveUser = function(user){
      service.user = user;
    };

    service.getUser = function() {
      return service.user;
    };

  }




})();