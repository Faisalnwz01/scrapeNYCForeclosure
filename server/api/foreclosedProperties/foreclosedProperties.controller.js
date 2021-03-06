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
var tempArray = [];


// Gets a list of ForeclosedPropertiess
exports.index = function (req, res) {
  var pdfArray = []

  function gotHTML(err, resp, html) {
    if (tempArray && tempArray.length > 0) {
      var todaysDate = new Date().getTime() / 1000;
      var lastAuctionDate = new Date(tempArray[0].auction_date).getTime() / 1000;
      if (todaysDate < lastAuctionDate) {
        console.log('lastAuctionDate has not passed yet');
        res.json(tempArray);
        return;
      }
    }
    var counter = 0;
    if (err) return console.error(err)
    var parsedHTML = $.load(html)
      // get all pdf tags and loop over them
    console.log(parsedHTML('strong').slice(0).eq(0).text().split(' in '))
    parsedHTML('a').map(function (i, link) {
      var href = $(link).attr('href');
      if (href) {
        if (!href.match('.pdf')) return
          // geocode API
        pdfArray.push({
          'PDFlink': domain + '/courts/2jd/kings/Civil/' + href,
          'address': href.split('/')[2].replace(/-/g, ' ').replace(/.pdf/g, '') + ', Brooklyn, Ny',
          'week': href.split('/')[1],
          'auction_date': new Date(parsedHTML('strong').slice(2).eq(0).text().split('DATE IS ')[1]),
          'time': parsedHTML('strong').slice(0).eq(0).text().split(' in ')[0],
          'room': parsedHTML('strong').slice(0).eq(0).text().split(' in ')[1]
        })
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
            size: '1600x1200',
            heading: 108.4,
            pitch: 7,
            fov: 40
          };
          prop.formatedAddress.streetView = gmAPI.streetView(params);
          counter++;
          if (counter === pdfArray.length) {
            tempArray = pdfArray
            res.json(pdfArray);
          }
        } else {
          console.log(err);
        }
      });
    })

  }

  var domain = 'http://www.nycourts.gov/courts/2jd/kings/civil/foreclosuresales.shtml'
  request(domain, gotHTML)
};
