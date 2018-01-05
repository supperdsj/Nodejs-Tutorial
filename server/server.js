const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app'
    });
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createAt:+new Date()
    });

    socket.emit('newMessage', {
        to:'dongsj@qq.com',
        text:'nice to mt you 2',
        from:'wx@qq.com',
        createAt:+new Date()
    });

    socket.on('createMessage',(message)=>{
        console.log('create message',message);
        io.emit('newMessage',{
           from:message.from,
           text:message.text,
           createAt:+new Date()
        });
        // socket.broadcast.emit('newMessage',{
        //        from:message.from,
        //        text:message.text,
        //        createAt:+new Date()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Disconnect from server');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server is up on port ' + port);
});