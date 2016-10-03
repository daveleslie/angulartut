/**
 * Created by David on 2016/09/30.
 */
(function() {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'APIBasePath'];
    function MenuDataService($http, APIBasePath){
        var service = this;

        service.getAllCategories = function() {
            return $http({method: 'GET', url: (APIBasePath+"/categories.json")})
                .then(function(response) {
                    return response.data;
                    //console.log("Menu Service response.data :" + categoryList);
                    //return categoryList;
                })
                .catch(function(error) {
                    console.log("error fetching all categories from server");
                });
        };

        service.getItemsForCategory = function(categoryShortName) {
            return $http({method: 'GET', url: (APIBasePath+"/menu_items.json?category="+categoryShortName)})
                .then(function(response) {
                    //var itemList = response.data.menu_items;
                    //console.log("Service Called:");
                    //console.log("itemLIst from service: "+itemList);
                    //return itemList;
                    return response.data;
                })
                .catch(function(error) {
                    console.log("error fetching items for category from server");
                });

        };



    }

})();