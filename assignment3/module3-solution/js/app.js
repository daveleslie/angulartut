(function () {
    'use strict';
    angular.module('NarrowItDown', [])

        .controller('NarrowItDownController', NarrowItDownController)
        //.controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com");


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                title: '@',
                onRemove: '&',
                search: '<'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
            //link: FoundItemsLink
            //transclude: true
        };
        return ddo;
    }

    //function FoundItemsLink(scope, element, attrs, controller) {
    //    console.log("Link scope is: "+ scope);
    //    console.log("controller is: "+ controller);
    //    console.log("element is: "+ element);
    //}
    //
    //function FoundItemsDirectiveController() {
    //    var menu = this;
    //
    //}

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';
        //menu.found = "testing";
        var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function (response) {
            menu.found = response;
            menu.title = (menu.found.length+" item(s) found");
            })
            .catch(function (error) {
                console.log("error in controller")
            });

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