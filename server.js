import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
import events from './sockets.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const PROD = process.env.NODE_ENV === "production";
const staticFiles = express.static("./client/build/static");
app.use('/games/goggl/static', staticFiles);
app.get('/games/goggl', (req, res) => res.sendFile(path.join(__dirname, `./${PROD ? "client/build" : "client/public"}/index.html`)));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://192.168.1.45:8103", "http://tower.local"],
        methods: ["GET", "POST"]
    },
    path: '/games/goggl/socket.io'
});

events(io);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
