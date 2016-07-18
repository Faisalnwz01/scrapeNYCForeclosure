'use strict';

var express = require('express');
var controller = require('./foreclosedProperties.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;
//# sourceMappingURL=index.js.map
