const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const events = require('./sockets');
const path = require('path');

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV;

app.use(express.static(ENV === "production" ? "client/build" : "client/public"));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, `./client/${ENV === "production" ? 'build' : 'public'}/index.html`)));

const server = http.createServer(app);
const io = socketIo(server, ENV === '' ? {} : {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

events(io);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
