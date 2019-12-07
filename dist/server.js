"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var express = require('express');

var app = express();

/*interface ServerOptionsInterface {
    port: number
}*/

/**
 * @class Server
 */
var Server =
/*#__PURE__*/
function () {
  /**
   * Server constructor
   */
  function Server() {
    _classCallCheck(this, Server);

    this.mainComponent = null;
    this.app = app;
  }
  /**
   * Plug the main component to the server
   *
   * @param {any} component
   */


  _createClass(Server, [{
    key: "plug",
    value: function plug(component) {
      this.mainComponent = component;
    }
    /**
     * Run the web server
     *
     * @param {ServerOptions} options
     */

  }, {
    key: "run",
    value: function run(options) {
      app.get('/*', function (req, res) {
        res.send('Hello World!');
      });
      app.listen(options.port, function () {
        console.log("Server is now listening on port : ".concat(options.port));
      });
    }
  }]);

  return Server;
}();

module.exports = Server;