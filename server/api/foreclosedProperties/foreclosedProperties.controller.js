/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/foreclosedPropertiess              ->  index
 */

'use strict';
var $ = require('cheerio')
var request = require('request')


// Gets a list of ForeclosedPropertiess
exports.index = function(req, res) {
  var pdfArray = []
  function gotHTML(err, resp, html) {
    if (err) return console.error(err)
    var parsedHTML = $.load(html)
    // get all pdf tags and loop over them
    parsedHTML('a').map(function(i, link) {
      var href = $(link).attr('href');
      if (href) {
        if (!href.match('.pdf')) return
        pdfArray.push({'link': domain + href,
      "name": $(link).contents()})
      }
    });
    console.log(pdfArray, 'link');

  }

  var domain = 'http://www.nycourts.gov/courts/2jd/kings/civil/foreclosuresales.shtml'
  request(domain, gotHTML)
  res.json(pdfArray);
};
