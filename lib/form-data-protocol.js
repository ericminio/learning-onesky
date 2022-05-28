const HYPHENS = '-----';
const CONTENT_DISPOSITION = 'Content-Disposition';
const NAME = 'name=';
const EOL = '\n';

const parse = (options) => {
    let segments = extractSegments(options.payload);
    let form = segments.reduce((form, segment) => {
        form.push(extractField(segment));
        return form;
    }, [])

    return { form };
};

const extractSegments = (payload) => {
    let boundary = extractBoundary(payload);
    return payload
            .split(boundary)
            .filter(segment => segment.includes(CONTENT_DISPOSITION))
            .map(segment => segment.split(EOL).map(line => line.trim()));
};

const extractField = (lines) => {
    let contentDispositionIndex = lines.findIndex(line => line.indexOf(CONTENT_DISPOSITION) == 0);
    let contentDisposition = lines[contentDispositionIndex];
    let name = contentDisposition.substring(contentDisposition.indexOf(NAME)+NAME.length);
    let indexOfEmptyLineAfterHeader = lines.findIndex((line, index) => index > contentDispositionIndex && line.length == 0);
    let value = lines[indexOfEmptyLineAfterHeader + 1];

    return { name, value }
}
const extractBoundary = (payload) => {
    let startIndex = payload.indexOf(HYPHENS);
    let endIndex = payload.substring(startIndex).indexOf(EOL);
    
    return payload.substring(startIndex, startIndex + endIndex);
}

module.exports = { parse };
