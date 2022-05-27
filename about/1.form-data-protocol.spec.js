const { expect } = require('chai');
const { parse } = require('../lib/form-data-protocol');

describe('Form data protocol', () => {
    
    it('can parse single line data of one field', () => {
        let form = parse({ incoming: `
            -----token
            Content-Disposition:form-data;name=field
            
            any content
            -----token--
        `});
        expect(form).to.deep.equal({
            data: [
                { name: 'field', value: 'any content' }
            ]
        });
    });
    it('can parse single line data of two fields', () => {
        let form = parse({ incoming: `
            -----token
            Content-Disposition:form-data;name=one
            
            111
            -----token
            Content-Disposition:form-data;name=two
            
            222
            -----token--
        `});
        expect(form).to.deep.equal({
            data: [
                { name: 'one', value: '111' },
                { name: 'two', value: '222' }
            ]
        });
    });
});