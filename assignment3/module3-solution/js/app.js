(function () {
    'use strict';
    var app = angular.module('NarrowItDown', []);

    app.controller('NarrowItDownController', NarrowItDownController);
    app.service('MenuSearchService', MenuSearchService);
    app.directive('foundItems', foundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;

        controller.getMatchedMenuItems = function(searchTerm) {
            controller.found = MenuSearchService.getMatchedMenuItems(searchTerm)
        };
    }

    function MenuSearchService() {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {

        };
    }

    function foundItems() {

    }

})();