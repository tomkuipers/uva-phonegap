// quoteController.js
(function () {
  'use strict';

  // 1. Controller maken
  angular.module('myApp')
    .controller('myController', myController);

  // 2. Controller implementatie
  myController.$inject = ['myService']; // Minify-safe!
  function myController(myService) {
    // Initialisaties
    var vm = this;
    vm.error = false;
    vm.quotes = [];
    function init() {
      vm.newQuote();
    }

    //API: 1. Get new, random quote
    vm.newQuote = function () {
      myService.randomQuote()
        .success(function (quote) {
          vm.quote = quote;
        }).error(function (err) {
          alert('Error bij ophalen quote: ' + err);
        });
    };

    // 2. Get all quotes (currently not in use in this controller)
    vm.allQuotes = function () {
      myService.allQuotes()
        .success(function (quotes) {
          vm.quotes = quotes;
          vm.error = false;
        }).error(function (err) {
          vm.quotes = [];
          vm.error = true;
        })
    };

    // init - get first quote to show in UI
    init();
  }// end myController

})();