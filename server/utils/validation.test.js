var expect = require('expect');
var {isRealString} = require('./validation');


describe('isRealString' , () => {

    it('should reject non string value' , () => {

        var response = isRealString(98);
        expect(response).toBe(false);

    } );

    it('should reject sting with only spaces' , () => {

        var response = isRealString('    ');
        expect(response).toBe(false);

    } );

    it('should allow string with non-space character' , () => {

        var response = isRealString("Lionel Messi  ");
        expect(response).toBe(true);

    } );

});

