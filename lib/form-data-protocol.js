const parse = (options) => {
    let lines = options.incoming.split('\n').map(line => line.trim());  
    let data = [];
    
    let part = extractPart(lines);
    data.push(part);

    if (lines.length > 7) {
        lines = lines.slice(5);
        part = extractPart(lines);
        data.push(part);
    }

    return { data };
};

const extractPart = (lines) => {
    let contentDispositionIndex = lines.findIndex(line => line.indexOf('Content-Disposition') == 0);
    let valueIndex = 1 + lines.findIndex((line, index) => index > contentDispositionIndex && line.length == 0);
    let contentDisposition = lines[contentDispositionIndex];
    let name = contentDisposition.substring(contentDisposition.indexOf('name=')+5);
    let value = lines[valueIndex];

    return { name, value }
}

module.exports = { parse };
