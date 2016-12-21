(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var ctrl = this;
  // var user = ctrl.user;

  ctrl.submit = function() {
    MenuService.getFavDish(ctrl.user.favDish)
      .then(function(response){
        ctrl.user.favDish = response.data;
        UserService.saveUser(ctrl.user);
        ctrl.success = true;
        console.log("added user");
      })
      .catch(function(error) {
        ctrl.success = false;
        ctrl.dishErr = true;
      });
    
  };

  ctrl.sUser = UserService.getUser();
  
  


}

})();
