/**
 * Created by PeterKassenaar on 27/01/15.
 */
// quoteService.js
(function () { // IIFE
  'use strict';

  // 1. Service en Constant
  angular.module('UVA.Services', [])
    .service('myService', myService);

  // 2. Implementatie van myService
  myService.$inject = ['$http', 'myConstant']; // Minify-safe!
  function myService($http, myConstant) {
    // API voor deze service

    // 1. retourneer alle quotes
    this.allQuotes = function () {
      $http({
        url   : myConstant.urlAllQuotes,
        method: 'GET'
      });
    };

    // 2. get random quote
    this.randomQuote = function(){
      return $http({
        url   : myConstant.urlRandomQuote,
        method: 'GET'
      });
    };

  }// end myService

})();