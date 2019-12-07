// @flow

import fs from 'fs';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import type {ServerOptionsInterface} from './interfaces/serverOptionsInterface';
import type {$Application, $Request, $Response} from 'express';

const app: $Application = express();
const router: express$Router = express.Router();

/**
 * @class Server
 */
class Server {
    mainComponent: number | null;
    app: $Application;
    router: express$Router;
    expressServer: http$Server | null;
    baseHtmlString: string;
    assetsDirPath: string | null;

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
    html(path: string): void {
        if (!fs.existsSync(path)) {
            console.error(`[Muxu Server] - Unable to find base HTML file at : ${path}`);

            return;
        }

        this.baseHtmlString = fs.readFileSync(path, 'utf8');
    }

    /**
     * Change assets directory path
     *
     * @param {string} path
     */
    assetsDir(path: string): void {
        this.assetsDirPath = path;
    }

    /**
     * Plug the main component to the server
     *
     * @param {any} component
     */
    plug(component: any): void {
        this.mainComponent = component;
    }

    /**
     * Run the web server
     *
     * @param {ServerOptionsInterface} options
     * @return {Promise<void>}
     */
    run(options: ServerOptionsInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            // Check Main Component
            if (this.mainComponent === null) {
                console.error('[Muxu Server] - No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
                console.error('[Muxu Server] - Server can\'t start');

                reject(new Error());
            }

            // Check Base HTML
            if (this.baseHtmlString === null) {
                console.error('[Muxu Server] - No HTML has been provided to the server. Did you forget to call the server "html()" method ?');
                console.error('[Muxu Server] - Server can\'t start');

                reject(new Error());
            }

            try {
                const serverRenderedContent = (req: $Request, res: $Response, next: express$NextFunction) => {
                    const MainComponent = this.mainComponent;

                    return res.send(
                        this.baseHtmlString.replace(
                            '<div id="root"></div>',
                            `<div id="root">${ReactDOMServer.renderToString(<MainComponent />)}</div>`,
                        ),
                    );
                };

                router.use('^/$', serverRenderedContent);

                if (this.assetsDirPath !== null) {
                    router.use(express.static(this.assetsDirPath, {maxAge: '30d'}));
                }

                this.app.use(this.router);

                this.expressServer = this.app.listen(options.port, function() {
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
    stop(): void {
        if (this.expressServer !== null) {
            this.expressServer.close(() => {
                console.log('[Muxu Server] - Server has been shut down.');
            });
        }
    }
}

module.exports = Server;
