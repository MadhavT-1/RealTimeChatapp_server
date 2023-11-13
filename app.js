const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connectedUsers = new Set();

io.on('connection', (socket) => {
    console.log('A user connected');
  
    connectedUsers.add(socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

app.get('/api/hello', (req, res) => {
    
    const users = Array.from(connectedUsers);
    res.json({ connectedUsers: users });
  });
  
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
