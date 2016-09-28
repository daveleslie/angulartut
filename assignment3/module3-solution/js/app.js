(function () {
    'use strict';
    var app = angular.module('NarrowItDown', []);

    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundItems', foundItems);
    app.constant('APIBasePath', "http://davids-restaurant.herokuapp.com");

    function foundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '=',
                title: '@'
                //narrow: '&'
                //onRemove: '&?'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';
        //menu.found = "testing";
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function (response) {
            menu.found = response;
            menu.title = menu.found.length;
            })
            .catch(function (error) {
                console.log("error in controller")
            });

        menu.narrow = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function (response) {
                    menu.found = response;
                    menu.title = (menu.found.length+" items found");
                    console.log("narrow clicked: "+searchTerm);
                    console.log("narrowed items: "+menu.title);
                    console.log("menu.found: "+menu.found);
                })
                .catch(function (error) {
                   console.log("error in click function");
                });
        };

    }

    MenuSearchService.$inject = ['$http', 'APIBasePath'];
    function MenuSearchService($http, APIBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({method: "GET", url: (APIBasePath+"/menu_items.json")})
                .then(function (response) {
                    // process the result and only keep items that match
                    var allItems = response.data.menu_items;
                    var foundItems = [];
                    //console.log("AllfoundItems: "+allItems.length);
                    //console.log(searchTerm);
                    //console.log(allItems[0].name);
                    for (var i = 0; i < allItems.length; i++) {
                        var str = allItems[i].description;
                        //console.log(str);
                        if (str.toLowerCase().indexOf(searchTerm) >= 0) {
                            foundItems.push(allItems[i]);
                        }
                    }
                    //console.log("filteredfoundItems: "+foundItems.length);
                    return foundItems;
                })
                .catch(function (error) {
                        console.log("error in service method");
                });


        };
    }


})();