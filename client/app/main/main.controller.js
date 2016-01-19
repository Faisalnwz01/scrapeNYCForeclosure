'use strict';
(function() {

function MainController($scope, $http) {
  var self = this;
  this.awesomeThings = [];

  $http.get('/api/foreclosedPropertiess').then(function(response) {
    console.log(response);
    self.awesomeThings = response.data;
  });

}

angular.module('foreclosurePropsApp')
  .controller('MainController', MainController);

})();
