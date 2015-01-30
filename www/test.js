/**
 * Created by PeterKassenaar on 28/01/15.
 */
// DEMO-land!!!!
(function () {
  'use strict';

  angular.module('myApp')
    .service('myService', myService);

  function myService($http) {

    // 'Revealing Module Pattern'
    // Dit is de 'API' van je functie
    return {
      getQuotes: _getQuotes,
      getRandQuote: _getRandQuotes
    }

    // Implementaties
    function _getQuotes() {
      var arg = arguments;
      console.log(arg[0]); // par1
      if(typeof arg[0] !== Number){

      }

      // return quotes
    }
    function _getRandQuotes() {
      // return quotes
    }


  }

  myService.getQuotes('par1', 10, {'a': 5})
})();