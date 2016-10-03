/**
 * Created by David on 2016/10/03.
 */
(function () {
    'use strict';

    angular.module('Spinner', []);

    angular.module('Spinner')
        .config(function () {
            console.log("Spinner config fired.");
        })
        .run(function () {
        console.log("Spinner run fired.");
        });

})();
