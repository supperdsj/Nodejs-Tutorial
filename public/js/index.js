var socket = io();

socket.on('connect', function () {
    console.log('Connect to server');
    socket.emit('createMessage', {
        from: 'dongsj@qq.com',
        text: 'nice to mt you',
        to: 'wx@qq.com',
        createAt: +new Date()
    });
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    console.log('new message', message);
});