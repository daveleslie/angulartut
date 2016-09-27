(function () {
    'use strict';
    var app = angular.module('NarrowItDown', []);

    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    //app.directive('foundItems', foundItems);
    app.constant('APIBasePath', "http://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        var promise = MenuSearchService.getMatchedMenuItems();

        promise.then(function (response) {
            console.log(response.data);
            menu.menu_items = response.data.menu_items;
            //menu.menu_items = menu.menu_items_array[0];
            //console.log("Menu Items Array: "+menu.menu_items_array.menu_items)
        })
            .catch(function (error) {
                console.log("Oops. Something went wrong.")
            });

    }

    MenuSearchService.$inject = ['$http', 'APIBasePath'];
    function MenuSearchService($http, APIBasePath) {
        var service = this;

        service.getMatchedMenuItems = function() {
            var foundItems = $http({
                method: "GET",
                url: (APIBasePath+"/menu_items.json")
            });
            return foundItems;
        };
    }


})();