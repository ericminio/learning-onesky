const request = require('./request');
const { create } = require('../lib/form-data-protocol');

const upload = async (options) => {
    let payload = create({
        form: [
            { name: 'file', fileName: options.fileName, value: options.content },
            { name: 'file_format', value: 'YAML' },
        ]
    });
    await request({
        port: 5001,
        method: 'POST',
        payload
    })
};



module.exports = { upload };