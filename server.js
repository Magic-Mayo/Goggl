const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const events = require('./sockets');

const PORT = process.env.PORT || 3001;

app.get('*', (req, res) => res.sendFile(`${__dirname}/client/build/index.html`));

const server = http.createServer(app);
const io = socketIo(server);

events(io);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
