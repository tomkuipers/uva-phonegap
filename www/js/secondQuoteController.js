// secondQuoteController.js
(function () {
  'use strict';

  // 1. Controller maken
  angular.module('myApp')
    .controller('secondController', secondController);

  // 2. Controller implementatie
  secondController.$inject = ['myService']; // Minify-safe!
  function secondController(myService) {
    // Initialisaties
    var vm = this;
    vm.error = false;
    // initalisatie
    function init() {
      vm.newQuote();
      // overige initialistaties
    }

    //API
    vm.newQuote = function () {
      myService.randomQuote()
        .success(function (quote) {
          vm.quote = quote;
        }).error(function (err) {
          alert('Error bij ophalen quote: ' + err);
        });
    };

    init();
  }// end secondController

})();