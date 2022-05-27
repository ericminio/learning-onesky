const parse = (options) => {
    let lines = options.incoming.split('\n').map(line => line.trim());
    
    let contentDisposition = lines.find(line => line.indexOf('Content-Disposition') == 0);
    let name = contentDisposition.substring(contentDisposition.indexOf('name=')+5);
    let data = [];

    data.push({ name, value: 'any content' });

    return { data };
};

module.exports = { parse };
