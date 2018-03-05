const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO(server);

app.use ( express.static(publicPath)  );

io.on('connection' , (socket) => {
    console.log ('New User connected');

    socket.emit('newMessageEvent',generateMessage('Admin' , 'Welcome to the chat app'));

    socket.broadcast.emit('newMessageEvent', generateMessage('Admin' , 'New User Joined') );

//    socket.on('disconnect',() => {
//       console.log('User was disconnected');
//    });

    socket.on('createMessageEvent',(newMessage) => {
        console.log('createMessage' , newMessage);
        io.emit('newMessageEvent',{
            from : newMessage.from,
            text : newMessage.text,
            createdAt : new Date().getTime()
        })

        socket.broadcast.emit('newMessageEvent',  generateMessage( newMessage.from , newMessage.text));

    });

} );



server.listen(port,() => {
   console.log(`Server is up at ${port}`) 
});
