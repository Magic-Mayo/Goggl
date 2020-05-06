const roomnames = [];

module.exports = socket => {
    // set username
    socket.on('set-username', (username, confirm) => {
        socket.username = username;
        confirm(socket.username)
    });

    // create room
    socket.on('create-room', (room, join) => {
        if(roomnames.includes(room)) {
            // If room exists will ask user to confirm if they want to try and join
            join({msg: 'Room already exists.  Would you like to request access?', room: room})
        } else {
            for(let key in socket.rooms){
                if(key !== socket.room){
                    socket.leave(key, (err) => {
                        if(err) throw err;
                    });
                }
            }
            socket.join(room, () => {
                roomnames.push(room);
                socket.room = room;
                join();
            });
        }
    });
    
    // join room
    socket.on('join-room', (room, create) => {
        if(roomnames.includes(room)){
            socket.room = room;
            for(let key in socket.rooms){
                if(key !== socket.room){
                    socket.leave(key, (err) => {
                        if(err) throw err
                    });
                    break;
                }
            }
            socket.join(room, () => {
                socket.to(room).emit('join', `${socket.username} has entered the room!`);
                create();
            });
        } else {
            // Sends mesage back to user if room doesn't exist.  Will create new room with the name they used if confirmed
            create({msg: 'Room does not exist.  Would you like to create it?', room: room})
        }
    });

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
        socket.leave(socket.room)
        socket.broadcast.emit('user-disconnect', `${socket.username} has disconnected`);
        socket.emit('You have disconnected')
    });
}
