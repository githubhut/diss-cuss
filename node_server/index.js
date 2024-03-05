
// const io = require("socket.io")(8000)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8000;

const allowedOrigins = ['http://127.0.0.1:5500/index.html', 'https://example.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
const user = {}

io.on("connection", socket=>{
    socket.on("new_user_joined", name=>{
        // console.log(name)
        user[socket.id] = name;
        socket.broadcast.emit("user_joined", name)
    })

    socket.on("send", message=>{
        socket.broadcast.emit("recieve", {message : message, name : user[socket.id]})
    });

    socket.on("disconnect", message=>{
        socket.broadcast.emit("dissconected", user[socket.id])
        delete user[socket.id];
    });

})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

