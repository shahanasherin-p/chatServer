const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'http://localhost:5173', 
}));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.status(200).send(`<h1 style="color:blue">server started at port and waiting for client request !!!<h1/>`)
})  