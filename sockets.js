const findRooms = (io, socket) => {
    const rooms = io.sockets.adapter.rooms;

    if(!rooms){
        return;
    }

    const ns = io.of("/");
    const gameList = [];

    for(let room in rooms){
        const firstId = Object.keys(rooms[room].sockets)[0];
        const firstUser = ns.connected[firstId].username;
        gameList.push({room: room, creator: firstUser, numPlayers: rooms[room].length})
    }

    socket.emit('games-list', gameList);
}

module.exports = io => {

    io.on('connection', socket =>{
        socket.leave(socket.id);
        findRooms(io, socket);

        // set username
        socket.on('set-username', (username, confirm) => {
            socket.username = username;
            confirm(socket.username)
        });
        
        const emitGames = setInterval(() => {
            findRooms(io, socket);
        }, 60000);

        socket.on('refresh-list', refresh => {
            findRooms(io, socket);
        })
        
        // create room
        socket.on('create-room', (room, join) => {
            // If room exists will ask user to confirm if they want to try and join
            for(let key in io.sockets.adapter.rooms){
                if(key === room){
                    return join({msg: 'Room already exists.  Would you like to request access?', room: room})
                }
            }

            // Leave all other rooms before joining
            for(let key in socket.rooms){
                if(key !== socket.room){
                    socket.leave(key, (err) => {
                        if(err) throw err;
                    });
                }
            }

            socket.join(room, () => {
                clearInterval(emitGames);
                socket.room = room;
                join();
            });
        });
        
        // join room
        socket.on('join-room', (room, create) => {
            // Sends mesage back to user if room doesn't exist.  Will create new room with the name they used if confirmed
            let foundRoom;
            for(let key in io.sockets.adapter.rooms){
                if(key === room){
                    foundRoom = true;
                }
            }

            if(!foundRoom){            
                return create({msg: 'Room does not exist.  Would you like to create it?', room: room})
            }

            // Leave all rooms before joining
            for(let key in socket.rooms){
                if(key !== socket.room){
                    socket.leave(key, (err) => {
                        if(err) throw err
                    });
                    break;
                }
            }

            socket.join(room, () => {
                clearInterval(emitGames);
                socket.room = room;
                socket.to(room).emit('join', `${socket.username} has entered the room!`);
                create();
            });
        });

        // Leave room
        socket.on('leave-room', confirmLeave => {
            socket.leave(socket.room, () => {
                confirmLeave(socket.room);
            });
        })

        // send messages
        socket.on('chat', msg => {
            socket.to(socket.room).emit('chat', {username: socket.username, msg: msg});
        });

        socket.on('disconnect', () => {
            clearInterval(emitGames);
            socket.leave(socket.room)
            socket.broadcast.emit('user-disconnect', `${socket.username} has disconnected`);
            socket.emit('You have disconnected')
        });
    })
}
