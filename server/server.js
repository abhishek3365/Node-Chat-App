const path = require ('path');
const http = require ('http');
const express = require ('express');
const socketIO = require ('socket.io');
const {generateMessage , generateLocationMessage } = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Screens} = require('./utils/screen');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer( app );
var io = socketIO(server);
var users = new Users();
var screens = new Screens();

app.use ( express.static(publicPath)  );

io.on('connection' , (socket) => {

    console.log ('New User connected');

    socket.on('join',(params , callback) => {

        if(!isRealString( params.screen ) || !isRealString(params.room) ){
            return callback('Screen and room are required');
        }

        socket.join(params.room);
        screens.removeScreen(socket.id);
        screens.addscreen(socket.id , params.screen , params.room)

        io.to(params.room).emit('updateScreenList', screens.getScreenList(params.room) );
        // socket.emit('newMessage',generateMessage('Admin' , 'Welcome to the chat app'));
        // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin' , `${params.name} Joined`) );
        // callback();

    });

    socket.on('createMessage',(newMessage , callback) => {

        var user = users.getUser(socket.id);

        if(user && isRealString(newMessage.text))
        {
            io.to(user.room).emit('newMessage',generateMessage( user.name , newMessage.text) );
            callback();
        }

    });

    socket.on('createImage',(newMessage , callback) => {

        console.log("createImage event");

        var user = screens.getScreen(socket.id);
        var screen = newMessage.screen

        var screenToSend = screens.getScreenByRoomAndName( user.room , newMessage.screen )

        if(user && isRealString(newMessage.image))
        {
            io.to(screenToSend.id).emit('newImage', { image : newMessage.image } );
            // callback();
        }

    });

    socket.on('createLocationMessage' , ( coords ) => {

        var user = users.getUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name , coords.lat , coords.lng ));
        }

    });

    socket.on('disconnect', () => {

        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList' , users.getUserList(user.room) );
            io.to(user.room).emit('newMessage' , generateMessage('Admin' , `${user.name} has left`));
        }

    });

} );

server.listen(port,() => {
   console.log(`Server is up at ${port}`) 
});
