/**
 * Created by David on 2016/09/30.
 */
(function() {
    'use strict';
    angular.module('Data')
        .component('categoryList', {
            templateUrl: 'src/menuapp/templates/categorylist.template.html',
            bindings: {
                items: '<'
            }
        });
})();