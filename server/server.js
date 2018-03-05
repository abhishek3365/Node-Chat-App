const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');
const {generateMessage , generateLocationMessage } = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO(server);

app.use ( express.static(publicPath)  );

io.on('connection' , (socket) => {
    console.log ('New User connected');




    socket.on('join',(params , callback) => {

        if(!isRealString( params.name ) || !isRealString(params.room) ){
            callback('Name and room are required');
        }

        socket.join(params.room);

        socket.emit('newMessage',generateMessage('Admin' , 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin' , `${params.name} Joined`) );

        callback();

    });

    socket.on('createMessage',(newMessage , callback) => {

        console.log('createMessage' , newMessage);
        io.emit('newMessage',generateMessage( newMessage.from , newMessage.text) );

        callback();

    });

    socket.on('createLocationMessage' , (coords) => {
        io.emit('newLocationMessage' , generateLocationMessage('Admin' , coords.lat , coords.lng));
    });

} );



server.listen(port,() => {
   console.log(`Server is up at ${port}`) 
});
