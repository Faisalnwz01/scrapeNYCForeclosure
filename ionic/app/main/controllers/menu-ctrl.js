'use strict';
angular.module('main')
  .controller('MenuCtrl', function ($log, $http, Config, $ionicSideMenuDelegate, $state) {
    var vm = this;
    $ionicSideMenuDelegate.canDragContent(false);
    $http.get(Config.ENV.SERVER_URL + 'api/foreclosedPropertiess').then(function (response) {
      $log.log(response);
      vm.propeties = response.data;
    });
    $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);
    vm.detailsFor = function (property) {
      // property.formatedAddress.geometry.location.lat
      $state.go('main.listDetail', {
        latitude: property.formatedAddress.geometry.location.lat,
        longitude: property.formatedAddress.geometry.location.lng
      });
    };
  });
