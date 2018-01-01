var request = require('request');
var util = require('util');
var format = util.format;

var ENDPOINT_SLUG = 'https://{loc}.cloudsigma.com/api/2.0';
var DEFAULT_DATACENTER = 'zrh';

var CloudSigma = function(username, password, datacenter) {
  this.username = username;
  this.password = password;
  this.datacenter = datacenter ? datacenter : DEFAULT_DATACENTER;
  this.baseUrl = this.makeBaseUrl();
}

CloudSigma.prototype.makeAuth = function() {
  var authString = format('%s:%s', this.username, this.password);
  return Buffer.from(authString).toString('base64')
}

CloudSigma.prototype.makeBaseUrl = function() {
  return ENDPOINT_SLUG.replace(/{loc}/, this.datacenter);
}

CloudSigma.prototype.makeUri = function(path) {
  return format('%s%s', this.makeBaseUrl(), path);
}

CloudSigma.prototype.headers = function() {
  return {
    'authorization': format('Basic %s', this.makeAuth()),
  }
}

CloudSigma.prototype.get = function(path, queryOpts, callback) {
  if (typeof queryOpts === 'function') {
    callback = queryOpts;
    queryOpts = {};
  }
  request({
    method: "GET",
    uri: this.makeUri(path),
    headers: this.headers(),
    qs: queryOpts || {},
    json: true,
  }, callback)
}

CloudSigma.prototype.post = function(path, data, queryOpts, callback) {
  if (typeof queryOpts === 'function') {
    callback = queryOpts;
    queryOpts = {};
  }
  request({
    method: "POST",
    uri: this.makeUri(path),
    headers: this.headers(),
    body: data || {},
    qs: queryOpts || {},
    json: true,
  }, callback)
}

CloudSigma.prototype.put = function(path, data, queryOpts, callback) {
  if (typeof queryOpts === 'function') {
    callback = queryOpts;
    queryOpts = {};
  }
  request({
    method: "PUT",
    uri: this.makeUri(path),
    headers: this.headers(),
    body: data || {},
    qs: queryOpts || {},
    json: true,
  }, callback)
}

CloudSigma.prototype.delete = function(path, callback) {
  request({
    method: "DELETE",
    uri: this.makeUri(path),
    headers: this.headers(),
  }, callback)
}

CloudSigma.prototype.options = function(callback) {
  request({
    method: "OPTIONS",
    uri: this.makeUri(''),
    headers: this.headers(),
    json: true,
  }, callback)
}

if (module.exports) {
  module.exports = CloudSigma;
}
