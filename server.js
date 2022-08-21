const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const events = require('./sockets');
const path = require('path');

const PORT = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === "production";
const static = express.static("./client/build/static");
app.use('/games/goggl/static', static);
app.get('/games/goggl', (req, res) => res.sendFile(path.join(__dirname, `./${PROD ? "client/build" : "client/public"}/index.html`)));

const server = http.createServer(app, {
    cors: {
        origin: ["http://192.168.1.45:8103", "http://tower.local"],
        methods: ["GET", "POST"]
    }
});
const io = socketIo(server, {path: '/games/goggl/socket.io'});

events(io);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
