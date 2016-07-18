'use strict';

describe('module: main, filter: trusted', function () {

  // load the filter's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // initialize a new instance of the filter before each test
  var $filter;
  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_('trusted');
  }));

  it('should return the input prefixed with "trusted filter:"', function () {
    var text = 'angularjs';
    expect($filter(text)).toBe('trusted filter: ' + text);
  });

});
