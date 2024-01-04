var socket = io.connect('http://localhost:7005')
var username = document.getElementById('username')
var message = document.getElementById('mess')
var send = document.getElementById('send')
var chat = document.getElementById('chat')
var broadcast = document.getElementById('broadcast')
send.addEventListener('click', function () {
    socket.emit('message', {
        username: username.value, message: message.value
    })
});
message.addEventListener('keypress', function () {
    socket.emit('broadcast', {
        username: username.value,
    })

})

socket.on('new', function (info) {
    broadcast.innerHTML = "";
    chat.innerHTML += '<div class="container"><strong>' + info.username + ':</strong>' + info.message + '</div>';
});
socket.on('new-broad', function (info) {
    broadcast.innerHTML = '<strong>' + info.username + ': </strong> write message &#9993; &#9993; &#9993;';

});
