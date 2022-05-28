const HYPHENS = '-----';
const CONTENT_DISPOSITION = 'Content-Disposition:';
const CONTENT_TYPE = 'Content-Type:';
const NAME_FIELD = 'name=';
const FILENAME_FIELD = 'filename=';
const EOL = '\n';
const FIELD_SEPARATOR = ';';

const parse = (options) => {
    let segments = extractSegments(options.payload);
    let form = segments.reduce((form, segment) => {
        form.push(extractFields(segment));
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

const extractFields = (lines) => {
    let contentDispositionIndex = lines.findIndex(line => line.indexOf(CONTENT_DISPOSITION) == 0);
    let contentDisposition = lines[contentDispositionIndex];
    let nameStartIndex = contentDisposition.indexOf(NAME_FIELD) + NAME_FIELD.length;
    let afterName = contentDisposition.substring(nameStartIndex);
    let nameEndIndex = afterName.length;
    if (afterName.includes(FIELD_SEPARATOR)) {
        nameEndIndex = afterName.indexOf(FIELD_SEPARATOR)
    }    
    let name = afterName.substring(0, nameEndIndex);
    let indexOfEmptyLineAfterHeader = lines.findIndex((line, index) => index > contentDispositionIndex && line.length == 0);
    let value = lines[indexOfEmptyLineAfterHeader + 1];
    let fields =  { name, value }
    if (contentDisposition.includes(FILENAME_FIELD)) {
        let fileNameStartIndex = contentDisposition.indexOf(FILENAME_FIELD);
        let fileName = contentDisposition.substring(fileNameStartIndex + FILENAME_FIELD.length);
        fields.fileName = fileName;
    }
    let contentTypeIndex = lines.findIndex(line => line.indexOf(CONTENT_TYPE) == 0)
    if (contentTypeIndex !== -1) {
        contentTypeLine = lines[contentTypeIndex];
        let contentType = contentTypeLine.substring(CONTENT_TYPE.length);
        fields.contentType = contentType.trim();
    }


    return fields;
}
const extractBoundary = (payload) => {
    let startIndex = payload.indexOf(HYPHENS);
    let endIndex = payload.substring(startIndex).indexOf(EOL);
    
    return payload.substring(startIndex, startIndex + endIndex);
}

module.exports = { parse };
