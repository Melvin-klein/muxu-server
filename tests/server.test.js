const Axios = require('axios');
const Server = require('../dist/server');

const TestComponent = () => {};

test('Can plug a main component to the server', () => {
    const server = new Server();

    server.plug(TestComponent);

    expect(server.mainComponent).not.toBeNull();
});

test('Server can listen on a port', async () => {
    const server = new Server();

    server.plug(TestComponent);

    await server.run({
        port: 5000,
    });

    let response = await Axios.get('http://localhost:5000');
    server.stop();

    expect(response.status).toBe(200);
});
