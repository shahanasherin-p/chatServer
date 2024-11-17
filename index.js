const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://chat-frontend-zeta-eight.vercel.app', 
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'https://chat-frontend-zeta-eight.vercel.app', 
}));


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    io.emit('message', message); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
  res.status(200).send(`<h1 style="color:blue">server started at port and waiting for client request<h1/>`)
})  