const http = require('http');

const post = (options, payload)=> {
    return new Promise((resolve, reject)=>{
        let request = http.request(options, pong => {
            let body = '';
            pong.on('data', chunk => {
                body += chunk;
            });
            pong.on('end', ()=>{
                pong.body = body;
                resolve(pong);
            });
            pong.on('error', error => {
                reject(error);
            })
        })
        request.on('error', error => {
            reject(error);
        })
        request.write(payload);
        request.end();
    })
};

module.exports = { post };