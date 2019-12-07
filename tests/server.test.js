const Axios = require('axios');
const Server = require('../dist/server');

const TestComponent = () => {};

test('Can plug a main component to the server', () => {
    const server = new Server();

    server.plug(TestComponent);

    expect(server.mainComponent).not.toBeNull();
});

test('Server can listen on a port', done => {
    const server = new Server();

    server.plug(TestComponent);

    server.run({
        port: 5000,
    }).then(() => {
        Axios.get('http://localhost:5000')
            .then(response => {
                expect(response.status).toBe(200);
                server.stop();

                done();
            })
    });
});
