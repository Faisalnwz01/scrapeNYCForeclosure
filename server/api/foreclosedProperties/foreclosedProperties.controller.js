/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/foreclosedPropertiess              ->  index
 */

'use strict';
var publicConfig = {
  key: 'AIzaSyAxF2aW5TWMiclJI5MdizMLBUFzXECbWM0',
  stagger_time: 1000,
  secure: true
};

var $ = require('cheerio');
var _ = require('lodash');
var request = require('request');
var stringify = require('json-stringify-safe');
var GoogleMapsAPI = require('googlemaps');
var gmAPI = new GoogleMapsAPI(publicConfig);

// Gets a list of ForeclosedPropertiess
exports.index = function (req, res) {
  var pdfArray = [];

  function gotHTML(err, resp, html) {
    var counter = 0;
    if (err) return console.error(err);
    var parsedHTML = $.load(html);
    // get all pdf tags and loop over them
    parsedHTML('a').map(function (i, link) {
      var href = $(link).attr('href');
      if (href) {
        if (!href.match('.pdf')) return;
        // geocode API
        pdfArray.push({
          'PDFlink': domain + '/courts/2jd/kings/Civil/' + href,
          'address': href.split('/')[2].replace(/-/g, ' ').replace(/.pdf/g, '') + ', Brooklyn, Ny',
          'week': href.split('/')[1]
        });
      }
    });
    _.each(pdfArray, function (prop) {
      var geocodeParams = {
        "address": prop.address,
        "language": "en",
        "region": "US"
      };

      gmAPI.geocode(geocodeParams, function (err, result) {
        if (!err) {
          prop.formatedAddress = result.results[0];
          var params = {
            location: result.results[0].geometry.location.lat + ',' + result.results[0].geometry.location.lng,
            size: '1200x1600',
            heading: 108.4,
            pitch: 7,
            fov: 40
          };
          prop.formatedAddress.streetView = gmAPI.streetView(params);
          counter++;
          if (counter === pdfArray.length) {
            res.json(pdfArray);
          }
        } else {
          console.log(err);
        }
      });
    });
  }

  var domain = 'http://www.nycourts.gov/courts/2jd/kings/civil/foreclosuresales.shtml';
  request(domain, gotHTML);
};
//# sourceMappingURL=foreclosedProperties.controller.js.map
