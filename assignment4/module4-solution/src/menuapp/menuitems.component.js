/**
 * Created by David on 2016/09/30.
 */
(function(){
    'use strict';
    angular.module('Data')
        .component('menuItems', {
            templateUrl: 'src/menuapp/templates/menuitems.template.html',
            bindings: {
                items: '<',
                details: '<'
            }
        });
})();