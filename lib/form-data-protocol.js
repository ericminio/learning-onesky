const parse = (options) => {
    let incoming = options.incoming;    
    let contentDisposition = incoming.indexOf('Content-Disposition');
    contentDisposition = incoming.substring(contentDisposition);
    contentDisposition = contentDisposition.substring(0, contentDisposition.indexOf('\n'));
    let name = contentDisposition.substring(contentDisposition.indexOf('name=')+5);
    let data = [];

    data.push({ name, value: 'any content' });

    return { data };
};

module.exports = { parse };
