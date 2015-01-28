/**
 * Created by PeterKassenaar on 27/01/15.
 */
// constant.js
(function () {
  'use strict';

  angular.module('myApp')
    .constant('myConstant', {
      urlAllQuotes  : 'http://pk-chuckfacts.azurewebsites.net/api/quotes/all',
      urlRandomQuote: 'http://pk-chuckfacts.azurewebsites.net/api/quotes/random'
    });
})();
