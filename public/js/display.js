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

socket.on('newImage' , function(message){

    console.log( "Image recieved" );

    $("#display-image").attr( "src" , `data:image/jpeg;base64, ${message.image }`)

    // var template = jQuery('#display-template').html();
    // var html = Mustache.render(template , {
    //     image : message.image
    // });

    // jQuery('#main-display-body').append(html);

});

socket.on('disconnect' , function() {
    console.log('Disconnected to the server');
})