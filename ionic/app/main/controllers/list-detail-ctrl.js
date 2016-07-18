'use strict';
angular.module('main')
  .controller('List-detailCtrl', function ($log, $state) {
    if (!$state.params.latitude) {
      $state.go('main.list');
    }
    var vm = this;
    $log.log('Hello from your Controller: List-detailCtrl in module main:. This is your controller:', this);
    vm.map = {
      center: $state.params,
      zoom: 16
    };
    vm.marker = {
      id: 'newMarker',
      coords: $state.params
    };
    console.log(vm.marker);

  });
