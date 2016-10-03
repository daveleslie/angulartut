/**
 * Created by David on 2016/09/30.
 */
(function() {
    'use strict';
    angular.module('Data')
        .controller('MenuItemController', MenuItemController);

    MenuItemController.$inject = ['menuItems'];
    function MenuItemController(menuItems) {
        var menu = this;
        menu.menuItems = menuItems.menu_items;
        menu.categoryDetails = menuItems.categoryDetails;





        //var short_name = "L";
        //
        //menu.$onInit = function() {
        //    MenuDataService.getItemsForCategory(short_name)
        //        .then(function(result) {
        //
        //            menu.menuItems = result;
        //            console.log("Got menu_items in controller:");
        //            console.log(menu.menuItems);
        //        })
        //        .catch(function(error) {
        //            console.log("controller error from service");
        //        });
        //}
    }
})();