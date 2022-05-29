const { post } = require('./post');

const upload = async (options) => {
    let payload = `
        -----token
        Content-Disposition: form-data; name="file"; filename="${options.fileName}"
        
        ${options.content}
        -----token
        Content-Disposition: form-data; name="file_format"
        
        YAML
        -----token--
    `.trim();
    await post({
        hostname: 'localhost',
        port: 5001,
        path: '/',
        method: 'POST'
    }, payload)
};



module.exports = { upload };