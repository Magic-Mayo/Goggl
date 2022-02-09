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
const ENV = process.env.NODE_ENV;

app.use(express.static(ENV === "production" ? "client/build" : "client/public"));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, `./client/${ENV === "production" ? 'build' : 'public'}/index.html`)));

const server = http.createServer(app);
const io = new Server(server, ENV === 'production' ? {} : {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

events(io);

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
