'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'uiGmapgoogle-maps'
    // TODO: load other modules selected during generation
])
  .config(function ($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDYcjtwpmJBz7mhHuRjzNfD3jOQcc9iO7k',
      //libraries: 'weather,geometry,visualization',
      v: '3.17'
    });

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/main/list');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'MenuCtrl as menu'
      })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'List-detailCtrl as detailCtrl'
          }
        },
        params: {
          latitude: null,
          longitude: null
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
  });
