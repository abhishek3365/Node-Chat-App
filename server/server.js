const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO(server);

app.use ( express.static(publicPath)  );

io.on('connection' , (socket) => {
    console.log ('New User connected');

    socket.emit('newMessageEvent', {
       from : 'Abhishek',
       text : 'Hey',
       createdAt : 123
    });

    socket.on('disconnect',() => {
       console.log('User was disconnected');
    });

    socket.on('createMessageEvent',(newMessage) => {
       console.log('createMessage' , newMessage);
    });

} );



server.listen(port,() => {
   console.log(`Server is up at ${port}`) 
});
