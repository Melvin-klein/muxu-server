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
    app: any;

    /**
     * Server constructor
     */
    constructor() {
        this.mainComponent = null;
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
     * @param {ServerOptions} options
     */
    run(options: ServerOptionsInterface): void {
        if (this.mainComponent === null) {
            console.error('No main component has been plugged to the server. Did you forget to call the server "plug()" method ?');
            console.error('Server can\'t start');

            return;
        }

        app.get('/*', function(req: $Request, res: $Response) {
            res.send('Hello World!');
        });

        app.listen(options.port, function() {
            console.log(`[Muxu Server] - Server is now listening on port : ${options.port}`);
        });
    }
}

module.exports = Server;
