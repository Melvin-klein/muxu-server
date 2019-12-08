"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

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
    this.assetsDirPath = null;
    this.baseHtmlString = null;
    this.app = app;
  }
  /**
   * Set the HTML file where main component will be rendered
   *
   * @param {string} path
   */


  html(path) {
    if (!_fs.default.existsSync(path)) {
      console.error(`[Muxu Server] - Unable to find base HTML file at : ${path}`);
      return;
    }

    this.baseHtmlString = _fs.default.readFileSync(path, 'utf8');
  }
  /**
   * Change assets directory path
   *
   * @param {string} path
   */


  public(path) {
    this.assetsDirPath = path;
  }
  /**
   * Plug the main component to the server
   *
   * @param {React.Component} component
   */


  plug(component) {
    this.mainComponent = component;
  }
  /**
   * Run the web server
   *
   * @param {object} options
   * @return {Promise<void>}
   */


  run(options) {
    return new Promise((resolve, reject) => {
      if (!this.isReadyToStart()) {
        console.error('[Muxu Server] - Server can\'t start');
        reject(new Error());
      }

      try {
        const serverRenderedContent = this.render();

        if (this.assetsDirPath !== null) {
          this.app.use(_express.default.static(this.assetsDirPath, {
            maxAge: '30d'
          }));
        }

        this.app.get('/*', serverRenderedContent);
        this.expressServer = this.app.listen(options.port, () => {
          console.log(`[Muxu Server] - Server is now listening on port : ${options.port}`);
          resolve();
        });
      } catch (e) {
        reject(new Error());
      }
    });
  }
  /**
   * Define is the server has all needed information to start
   *
   * @return {boolean}
   */


  isReadyToStart() {
    if (this.mainComponent === null) {
      console.error('[Muxu Server] - No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
      return false;
    } // Check Base HTML


    if (this.baseHtmlString === null) {
      console.error('[Muxu Server] - No HTML has been provided to the server. Did you forget to call the server "html()" method ?');
      return false;
    }

    return true;
  }
  /**
   * Render function for SSR
   *
   * @return {Function}
   */


  render() {
    return (req, res) => {
      const MainComponent = this.mainComponent;

      if (this.baseHtmlString === null) {
        console.error('[Muxu Server] - Html is missing for render');
        return null;
      }

      return res.send(this.baseHtmlString.replace('<div id="root"></div>', `<div id="root">${_server.default.renderToString(_react.default.createElement(MainComponent, null))}</div>`));
    };
  }
  /**
   * Stop the server
   */


  stop() {
    if (this.expressServer !== null) {
      this.expressServer.close(() => {
        console.log('[Muxu Server] - Server has been shut down.');
      });
    }
  }

}

module.exports = Server;