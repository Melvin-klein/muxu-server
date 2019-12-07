"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();
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
      if (this.mainComponent === null) {
        console.error('No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
        console.error('Server can\'t start');
        return;
      }

      app.get('/*', function (req, res) {
        res.send('Hello World!');
      });
      app.listen(options.port, function () {
        console.log("[Muxu Server] - Server is now listening on port : ".concat(options.port));
      });
    }
  }]);

  return Server;
}();

module.exports = Server;