const rooms = [];

module.exports = socket => {
    // set username
    socket.on('set-username', (username, confirm) => {
        socket.username = username;
        confirm(socket.username)
    });

    // create room
    socket.on('create-room', (room, join) => {
        if(rooms.includes(room)) {
            // If room exists will ask user to confirm if they want to try and join
            join('Room already exists.  Would you like to request access?')
        } else {
            rooms.push(room);
            socket.join(room);
            join();
        }
    });

    // join room
    socket.on('join-room', (room, create) => {
        if(rooms.includes(room)){
            socket.room = room;
            socket.join(room);
            socket.broadcast.emit();
            create();
        } else {
            // Sends mesage back to user if room doesn't exist.  Will create new room with the name they used if confirmed
            create('Room does not exist.  Would you like to create it?')
        }
    });

    // send messages
    socket.on('chat', msg => {
        console.log(socket.broadcast.emit)
        socket.broadcast.emit('chat', {username: socket.username, msg: msg});
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnect', `${socket.username} has disconnected`);
        socket.emit('You have disconnected')
    });
}
