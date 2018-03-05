var socket = io();
socket.on('connect' , function() {
    console.log('Connected to server');

})

socket.on('disconnect' , function() {
    console.log('Disconnected to the server');
})

socket.on('newMessageEvent' , function(message){
   console.log('New Message' , message );
});
