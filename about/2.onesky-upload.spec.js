const { expect } = require('chai');
const { upload } = require('../lib/onesky');
const { parse } = require('../lib/form-data-protocol');

const http = require('http');
const port = 5001;

describe('OneSky upload', () => {
    
    let server;
    let sockets = [];
    let received;

    beforeEach((done) => {
        server = http.createServer((request, response) => {
            let body = '';
            request.on('data', (chunk) => {
                body += chunk;
            });
            request.on('end', () => {
                received = parse({ payload: body });
                response.statusCode = 201;
                response.write('OK');
                response.end();
            });
        });
        server.on('connection', (socket)=> {
            sockets.push(socket);
            socket.on('close', ()=> {
                sockets.splice(sockets.indexOf(socket), 1);
            });
        });
        server.listen(port, done);
    });
    afterEach((done) => {
        sockets.forEach(socket=> socket.destroy());
        server.close(done);    
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

