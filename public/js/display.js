var socket = io();

socket.on('connect' , function() {

    var params = jQuery.deparam(window.location.search);
    socket.emit('join' , params , function (error) {
        if(error){
            alert(error);
            window.location.href = '/';
        }
        else{
            console.log('no error');
        }
    });

})

socket.on('disconnect' , function() {
    console.log('Disconnected to the server');
})