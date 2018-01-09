const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocation} = require('./utils/message.js');
const {Users} = require('./utils/users.js');
const {isRealString} = require('./utils/validation.js');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name or room required.');
        } else {
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            // socket.leave(params.room);

            // io.emit -> io.to(params.room).emit
            // socket.broadcast.emit-> socekt.broadcast.to(params.room).emit
            io.to(params.room).emit('updateUserList', users.getUserList(params.room));
            socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
            socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has been joined room ${params.room}.`));
            callback();
        }
    });

    socket.on('createMessage', (message) => {
        const user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(message.from, message.text));
        }
    });
    socket.on('createLocation', (coords) => {
        const user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocation', generateLocation(coords.from, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server is up on port ' + port);
});