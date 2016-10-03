(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to homepage if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Setup UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'src/menuapp/templates/home.template.html'
            })

        // Categories List
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/menuapp/templates/categories.template.html',
                controller: 'CategoryController as cC',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })

        // Items List
            .state('items', {
                url: '/categories/{short_name}',
                templateUrl: 'src/menuapp/templates/items.template.html',
                controller: 'MenuItemController as iC',
                resolve: {
                    menuItems: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
                        var short_name = $stateParams.short_name;
                        //console.log("works");
                        return MenuDataService.getItemsForCategory(short_name)
                            .then(function(response) {
                                var shortmenu = {
                                    menu_items : [],
                                    categoryDetails : []

                                };
                                shortmenu.menu_items = response.menu_items;
                                shortmenu.categoryDetails = response.category;
                                //console.log("resolve returns menuItems: "+menuItems);
                                //return response.menu_items;
                                return shortmenu;
                            })
                            .catch(function (error) {
                                console.log("resolve for items not working:");
                            })
                    }]
                }
        });

    }


})();