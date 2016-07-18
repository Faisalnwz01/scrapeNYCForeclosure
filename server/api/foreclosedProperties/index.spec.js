'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var foreclosedPropertiesCtrlStub = {
  index: 'foreclosedPropertiesCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var foreclosedPropertiesIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './foreclosedProperties.controller': foreclosedPropertiesCtrlStub
});

describe('ForeclosedProperties API Router:', function () {

  it('should return an express router instance', function () {
    foreclosedPropertiesIndex.should.equal(routerStub);
  });

  describe('GET /api/foreclosedPropertiess', function () {

    it('should route to foreclosedProperties.controller.index', function () {
      routerStub.get.withArgs('/', 'foreclosedPropertiesCtrl.index').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
