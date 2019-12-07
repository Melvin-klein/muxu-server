"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
/**
 * @class Server
 */

class Server {
  /**
   * Server constructor
   */
  constructor() {
    this.mainComponent = null;
    this.expressServer = null;
    this.app = app;
  }
  /**
   * Plug the main component to the server
   *
   * @param {any} component
   */


  plug(component) {
    this.mainComponent = component;
  }
  /**
   * Run the web server
   *
   * @param options
   * @returns {Promise<void>}
   */


  run(options) {
    return new Promise((resolve, reject) => {
      if (this.mainComponent === null) {
        console.error('[Muxu Server] - No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
        console.error('[Muxu Server] - Server can\'t start');
        reject();
      }

      try {
        this.app.get('/*', function (req, res) {
          res.send('Hello World!');
        });
        this.expressServer = this.app.listen(options.port, function () {
          console.log(`[Muxu Server] - Server is now listening on port : ${options.port}`);
          resolve();
        });
      } catch (e) {
        reject();
      }
    });
  }

  stop() {
    if (this.expressServer !== null) {
      this.expressServer.close(() => {
        console.log('[Muxu Server] - Server has been shut down.');
      });
    }
  }

}

module.exports = Server;