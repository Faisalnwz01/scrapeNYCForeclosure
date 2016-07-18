'use strict';

describe('module: main, controller: List-detailCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var List-detailCtrl;
  beforeEach(inject(function ($controller) {
    List-detailCtrl = $controller('List-detailCtrl');
  }));

  it('should do something', function () {
    expect(!!List-detailCtrl).toBe(true);
  });

});
