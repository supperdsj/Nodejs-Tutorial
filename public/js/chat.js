var socket = io();

function scrollToBottom() {
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHegiht = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHegiht + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connect to server');
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {

        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('updateUserList', function (users) {
    const ol = $('<ol></ol>');
    users.forEach(function (user) {
        console.log(user);
        ol.append($('<li></li>').text(user));
    });
    console.log(ol);
    $('#users').html(ol);
    console.log('user list', users);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    // $('#messages').append('<li>' + message.from + ' [' + formattedTime + '] : ' + message.text + '</li>');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});
socket.on('newLocation', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    // $('#messages').append('<li>' + message.from + ' [' + formattedTime + '] : ' + '<a target="_blank" href="' + message.url + '">' + 'shared location' + '</a></li>');

    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    // if ($('input[name=message]').val().trim() !== '') {
    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, function () {
        $('input[name=message]').val('');
    });
    // } else {
    //     alert('please input some message');
    // }
});

$('#share-location').on('click', function (e) {
    if (!navigator.geolocation) {
        return alert('geolocation not support by your browser.');
    }
    $('#share-location').attr('disabled', 'disabled').text('Sharing location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocation', {
            from: 'User',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        $('#share-location').removeAttr('disabled').text('Share location');
    }, function (error) {
        alert('Unable to fetch location.')
    })
});