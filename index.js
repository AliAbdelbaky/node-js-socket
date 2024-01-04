const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming chat messages
    socket.on('chat message', (msg) => {
        console.log('Message: ' + msg);
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('broadcast', function (info) {
        socket.broadcast.emit('new-broad', info);
    })

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});



const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
