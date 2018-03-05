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

    socket.emit('newMessageEvent',{
        from : 'Admin',
        text : 'Welcome to chat app'
    });

    socket.broadcast.emit('newMessageEvent',{
        from : 'Admin',
        text : 'New User Joined',
        createdAt : new Date().getTime()
    }   );

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

        socket.broadcast.emit('newMessageEvent',{
            from : newMessage.from,
            text : newMessage.text,
            createdAt : new Date().getTime()
        });

    });

} );



server.listen(port,() => {
   console.log(`Server is up at ${port}`) 
});
