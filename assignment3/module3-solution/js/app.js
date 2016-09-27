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

        //menu.searchTerm = '';
        //var promise = MenuSearchService.getMatchedMenuItems();
        //console.log("promise: "+promise);
        //promise.then(function (result) {
        //    menu.found = result.data;
        //    console.log("result.data.foundItems: "+result.foundItems);
        //    console.log("menu.found: "+menu.found);
        //})
        //    .catch(function (error) {
        //        console.log("something went wrong.");
        //    });



        //menu.filter = function(searchTerm) {
        //    MenuSearchService.getMatchedMenuItems(searchTerm);
        //};


        var promise = MenuSearchService.getMatchedMenuItems();
        //console.log("menu_items: "+menu.menu_items);
        console.log("promise: "+promise);

        promise.then(function (response) {
            menu.menu_items = response.data;
        })
            .catch(function (error) {
                console.log("error in controller")
            });
        //promise.then(function (response) {
        //    console.log(response.data);
        //    menu.menu_items = response.data.menu_items;
        //    //menu.menu_items = menu.menu_items_array[0];
        //    //console.log("Menu Items Array: "+menu.menu_items_array.menu_items)
        //})
        //    .catch(function (error) {
        //        console.log("Oops. Something went wrong.")
        //    });

    }

    MenuSearchService.$inject = ['$http', 'APIBasePath'];
    function MenuSearchService($http, APIBasePath) {
        var service = this;

        //service.getMatchedMenuItems = function() {
        //    return $http({method:"GET", url: (APIBasePath+"/menu_items.json")})
        //        .then(function (result) {
        //            // filter result based on search terms
        //            var foundItems = result.data.menu_items;
        //            //console.log("foundItems: "+foundItems);
        //            //return the processed items
        //            return foundItems;
        //        });
        //};



        service.getMatchedMenuItems = function() {

            return $http({method: "GET", url: (APIBasePath+"/menu_items.json")})
                .then(function (response) {
                    var foundItems = response.data.menu_items;
                    //console.log("foundItems:"+foundItems);
                    return foundItems;
                })
                .catch(function (error) {
                    console.log("error in service method");
                });


        };
    }


})();