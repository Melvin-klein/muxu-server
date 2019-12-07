"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _server = _interopRequireDefault(require("react-dom/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const router = _express.default.Router();
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
    this.app = app;
    this.router = router;
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


  assetsDir(path) {
    this.assetsDirPath = path;
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
   * @param {ServerOptionsInterface} options
   * @return {Promise<void>}
   */


  run(options) {
    return new Promise((resolve, reject) => {
      // Check Main Component
      if (this.mainComponent === null) {
        console.error('[Muxu Server] - No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
        console.error('[Muxu Server] - Server can\'t start');
        reject(new Error());
      } // Check Base HTML


      if (this.baseHtmlString === null) {
        console.error('[Muxu Server] - No HTML has been provided to the server. Did you forget to call the server "html()" method ?');
        console.error('[Muxu Server] - Server can\'t start');
        reject(new Error());
      }

      try {
        const serverRenderedContent = (req, res, next) => {
          const MainComponent = this.mainComponent;
          return res.send(this.baseHtmlString.replace('<div id="root"></div>', `<div id="root">${_server.default.renderToString(React.createElement(MainComponent, null))}</div>`));
        };

        router.use('^/$', serverRenderedContent);

        if (this.assetsDirPath !== null) {
          router.use(_express.default.static(this.assetsDirPath, {
            maxAge: '30d'
          }));
        }

        this.app.use(this.router);
        this.expressServer = this.app.listen(options.port, function () {
          console.log(`[Muxu Server] - Server is now listening on port : ${options.port}`);
          resolve();
        });
      } catch (e) {
        reject(new Error());
      }
    });
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