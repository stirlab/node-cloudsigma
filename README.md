# Overview

Dead simple [Node.js](https://nodejs.org) wrapper for the
[CloudSigma API](https://cloudsigma-docs.readthedocs.io/en/latest).

## Installation (for now)

No npm package yet...

Take it straight from Github:

```javascript
"dependencies": {
  "cloudsigma": "stirlab/node-cloudsigma"
}
```

## Usage

The library leverages the [request](https://www.npmjs.com/package/request) HTTP
library, providing simple wrappers for the five supported HTTP verbs.

The path and JSON data parameters can be figured out via CloudSigma's
[API](https://cloudsigma-docs.readthedocs.io/en/latest).

Note that many of the endpoint paths include a trailing slash -- you'll need
to include that to hit the right path on the endpoint.

### Examples

```javascript

var CloudSigma = require('cloudsigma');

// Initialize an new datacenter endpoint.
// datacenter-label is the three letter location code for the datacenter you
// wish to connect to, see:
// http://cloudsigma-docs.readthedocs.io/en/2.14/general.html
var cloudSigma = new CloudSigma('username', 'password', 'datacenter-label');

// Fetch all endpoints.
cloudSigma.options(function(err, response, body) {
  console.log(err);
  console.log(body);
});

// Get all servers.
cloudSigma.get("/servers/", function(err, response, body) {
  console.log(err);
  console.log(body);
});

// Update server attributes.
var data = {
    "cpu": 1000,
    "mem": 1073741824,
    "name": "test-server",
    "vnc_password": "supersecret"
};
cloudSigma.put("/servers/" + server_uuid + "/", data, function(err, response, body) {
  console.log(err);
  console.log(body);
});

// Start a server.
cloudSigma.post("/servers/" + server_uuid + "/action/", null, {do: 'start'}, function(err, response, body) {
  console.log(err);
  console.log(body);
});

// Create a new disk drive.
var data = {
    "media": "disk",
    "name": "test_drive_0",
    "size": 1073741824
}
cloudSigma.post("/drives/", data, function(err, response, body) {
  console.log(err);
  console.log(body);
});

// Delete a disk drive.
cloudSigma.delete("/drives/" + drive_uuid + "/", function(err, response, body) {
  console.log(err);
  console.log(body);
});

### Function signatures

```javascript
options(callback)

get(path, callback)
get(path, queryOpts, callback)

post(path, data, callback)
post(path, data, queryOpts, callback)

put(path, data, callback)
put(path, data, queryOpts, callback)

delete(path, callback)
```
