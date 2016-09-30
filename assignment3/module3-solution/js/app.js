(function () {
    'use strict';
    angular.module('NarrowItDown', [])

        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com")
        .component('foundItems', {
            templateUrl: 'foundItems.html',
            bindings: {
                items: '<',
                title: '@',
                onRemove: '&',
                search: '<'
            }
        });


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';

        menu.narrow = function(searchTerm) {
            MenuSearchService.getMatchedMenuItems(searchTerm)
                .then(function (response) {
                    menu.found = response;
                    menu.title = (menu.found.length+" item(s) found");
                    menu.filter = searchTerm;
                })
                .catch(function (error) {
                   console.log("error in click function");
                });
        };

        menu.removeItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
            console.log("item removed");
            menu.title = (menu.found.length+" item(s) found");
            console.log(menu.title);
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

                    if (searchTerm.length == 0) {
                        allItems = [];
                    } else {
                        for (var i = 0; i < allItems.length; i++) {
                            var str = allItems[i].description;

                            if (str.toLowerCase().indexOf(searchTerm) >= 0) {
                                foundItems.push(allItems[i]);
                            }
                        }
                    }

                    return foundItems;
                })
                .catch(function (error) {
                        console.log("error in service method");
                });
        };
    }


})();