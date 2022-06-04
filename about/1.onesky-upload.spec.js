const { expect } = require('chai');
const { upload } = require('../lib/onesky');
const { Server } = require('./more/server');
const extractPayload = require('../lib/extract-payload');
const { parse } = require('../lib/form-data-protocol');
const port = 5001;

describe('OneSky upload', () => {
    
    let server;
    let received;

    beforeEach((done) => {
        server = new Server(port, async (request, response) => {
            let payload = await extractPayload(request);
            received = parse({ payload });
            response.writeHead(201, { 'content-Type': 'text/plain' });
            response.end('Created');
        })
        server.start(done);
    });
    afterEach((done) => {
        server.stop(done);    
    });

    it('includes the required fields', async () => {
        await upload({
            fileName: 'hello.yml',
            fileFormat: 'YAML',
            content: 'hello OneSky'
        });
        expect(received).to.deep.equal({
            form: [
                { name: 'file', fileName: 'hello.yml', value: 'hello OneSky' },
                { name: 'file_format', value: 'YAML' },
            ]
        });
    });
});

