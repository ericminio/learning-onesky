const HYPHENS = '-----';
const CONTENT_DISPOSITION = 'Content-Disposition:form-data';
const NAME = 'name=';
const EOL = '\n';

const parse = (options) => {
    let token = extractToken(options.incoming);
    let parts = options.incoming
        .split(token)
        .filter(part => part.includes(CONTENT_DISPOSITION))
        .map(part => part.split(EOL).map(line => line.trim()));
    let form = parts.reduce((form, part) => {
        form.push(extractField(part));
        return form;
    }, [])

    return { form };
};

const extractField = (lines) => {
    let contentDispositionIndex = lines.findIndex(line => line.indexOf(CONTENT_DISPOSITION) == 0);
    let contentDisposition = lines[contentDispositionIndex];
    let name = contentDisposition.substring(contentDisposition.indexOf(NAME)+NAME.length);
    let indexOfEmptyLineAfterHeader = lines.findIndex((line, index) => index > contentDispositionIndex && line.length == 0);
    let value = lines[indexOfEmptyLineAfterHeader + 1];

    return { name, value }
}
const extractToken = (incoming) => {
    let tokenStartIndex = incoming.indexOf(HYPHENS);
    let tokenEndIndex = incoming.substring(tokenStartIndex).indexOf(EOL);
    
    return incoming.substring(tokenStartIndex, tokenStartIndex + tokenEndIndex);
}

module.exports = { parse };
