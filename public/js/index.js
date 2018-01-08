var socket = io();

socket.on('connect', function () {
    console.log('Connect to server');
});

socket.on('disconnect', function () {
    console.log('Disconnect from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    // $('#messages').append('<li>' + message.from + ' [' + formattedTime + '] : ' + message.text + '</li>');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createAt:formattedTime
    });
    $('#messages').append(html);
});
socket.on('newLocation', function (message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    // $('#messages').append('<li>' + message.from + ' [' + formattedTime + '] : ' + '<a target="_blank" href="' + message.url + '">' + 'shared location' + '</a></li>');

    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        url:message.url,
        from:message.from,
        createAt:formattedTime
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    if ($('input[name=message]').val().trim() !== '') {
        socket.emit('createMessage', {
            from: 'User',
            text: $('input[name=message]').val()
        }, function (str) {
            $('input[name=message]').val('');
        });
    } else {
        alert('please input some message');
    }
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