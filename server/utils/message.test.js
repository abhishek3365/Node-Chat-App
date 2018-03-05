var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');


describe('generateMessage' , () => {

    it('should generate correct message object' , () => {

        var from = 'Abhishek';
        var text = 'Some message';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

    } );

});

describe('generateLocationMessage' , () => {

    it('should generate correct location object' , () => {

        var from = 'Abhishek';
        var lat = 1;
        var lng = 1;
        var url = 'http://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, lat , lng);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,url});

    } );

});
