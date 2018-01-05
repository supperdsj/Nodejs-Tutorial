var socket = io();

socket.on('connect', function () {
    console.log('Connect to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    $('#messages').append('<li>' + message.from + ':' + message.text + '</li>');
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    if ($('input[name=message]').val().trim() !== '') {
        socket.emit('createMessage', {
            from: 'User',
            text: $('input[name=message]').val()
        }, function (str) {
        });
    } else {
        alert('please input some message');
    }
});