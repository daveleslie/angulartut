/**
 * Created by David on 2016/09/30.
 */
(function(){
    'use strict';
    angular.module('Data')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categories'];
    function CategoryController(categories) {
        var cC = this;
        cC.categories = categories;


        //cC.$onInit = function() {
        //    MenuDataService.getAllCategories()
        //        .then(function(result) {
        //            cC.categories = result;
        //            console.log("got categories: "+cC.categories);
        //        })
        //        .catch(function(error){
        //            console.log("controller error");
        //        });

        //};
    }

})();