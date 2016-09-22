(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', BuyListController)
        .controller('AlreadyBoughtShoppingController', BoughtListController)
        .service('ShoppingListCheckOffService', ShoppingListService);
        //.service('BoughtListService', BoughtListService);

    BuyListController.$inject = ['ShoppingListCheckOffService'];
    function BuyListController(ShoppingListService) {
        var buyList = this;
        buyList.toBuy = ShoppingListService.showToBuy();
        buyList.buy = function(index) {
            ShoppingListService.buyItem(index);
        };

    }

    BoughtListController.$inject = ['ShoppingListCheckOffService'];
    function BoughtListController(ShoppingListService) {
        var boughtList = this;
        boughtList.bought = ShoppingListService.showBought();
    }

    function ShoppingListService() {
        var listService = this;

        //list of items to buy
         listService.toBuy = [
            {
                name: 'cookies',
                quantity: 10
            },
            {
                name: 'liquorice',
                quantity: 1
            },
            {
                name: 'soft drink',
                quantity: 1
            },
            {
                name: 'Doritos',
                quantity: '1 bag'
            },
            {
                name: 'twinky',
                quantity: 1
            }
        ];

        //list of already bought items
        listService.bought = [];

        listService.buyItem = function (index) {
            listService.bought.push(listService.toBuy[index]);
            listService.toBuy.splice(index, 1);

            console.log("***DEBUG***");
            console.log("Bought List: ");
            console.log(listService.bought);
            console.log("to Buy List: ");
            console.log(listService.toBuy);
            //return listService.bought;
        };

        listService.showToBuy = function() {
            return listService.toBuy;
        };

        listService.showBought = function() {
            return listService.bought;
        }
    }


})();