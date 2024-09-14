const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

// Listen on the specified port
http.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO setup
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log(`user connected `);
    socket.on('message' , (msg) => {
        socket.broadcast.emit( `message`, msg );

    })
});



