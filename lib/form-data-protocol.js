const parse = (options) => {
    let lines = options.incoming.split('\n').map(line => line.trim());  
    let data = [];
    
    let contentDispositionIndex = lines.findIndex(line => line.indexOf('Content-Disposition') == 0);
    let contentDisposition = lines[contentDispositionIndex];
    let name = contentDisposition.substring(contentDisposition.indexOf('name=')+5);
    let valueIndex = 1 + lines.findIndex((line, index) => index > contentDispositionIndex && line.length == 0);
    let value = lines[valueIndex];
    data.push({ name, value });

    return { data };
};

module.exports = { parse };
