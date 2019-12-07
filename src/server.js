// @flow

import express from 'express';
import type { ServerOptionsInterface } from './interfaces/serverOptionsInterface';

const app = express();

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
        app.get('/*', function(req, res) {
            res.send('Hello World!');
        });

        app.listen(options.port, function() {
            console.log(`Server is now listening on port : ${options.port}`);
        });
    }
}

module.exports = Server;
