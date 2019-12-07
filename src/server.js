// @flow

import express from 'express';
import type {ServerOptionsInterface} from './interfaces/serverOptionsInterface';
import type {$Application, $Request, $Response} from 'express';

const app: $Application = express();

/**
 * @class Server
 */
class Server {
    mainComponent: number | null;
    app: $Application;
    expressServer: http$Server | null;

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
            if (this.mainComponent === null) {
                console.error('[Muxu Server] - No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
                console.error('[Muxu Server] - Server can\'t start');

                reject(new Error());
            }

            try {
                this.app.get('/*', function(req: $Request, res: $Response) {
                    res.send('Hello World!');
                });

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
