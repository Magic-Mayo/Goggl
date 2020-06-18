const wordList = require('./wordlist.json');

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

    return socket.emit('games-list', gameList);
}

const findPlayersInRoom = (io, socket) => {
    const players = [];
    const room = io.sockets.adapter.rooms[socket.room].sockets;
    const user = io.of('/').connected;

    for(let player in room){
        players.push({username: user[player].username, score: 0});
    }

    return players;
}

const playersReady = (io, socket) => {
    const players = [];
    const room = io.sockets.adapter.rooms[socket.room].sockets;
    const user = io.of('/').connected;

    for(let player in room){
        if(user[player].ready){
            players.push({username: user[player].username, ready: socket.ready});
        }
    }

    return players;
}


const binarySearch = word => {
    let currentElement;
    let currentIndex;
    let maxIndex = wordList.length - 1;
    let minIndex = 0;
  
    while (minIndex <= maxIndex) {
        currentIndex = Math.floor((minIndex + maxIndex) / 2);
        currentElement = wordList[currentIndex];
  
        if (currentElement.localeCompare(word) === -1) {
            minIndex = currentIndex + 1;  
        } else if (currentElement.localeCompare(word) === 1) {
            maxIndex = currentIndex - 1;
        } else {
            return true;
        }
    }
  
    return false;
}

const verifyWords = (socket, wordsArr) => {
    const newList = {words: [], score: 0, username: socket.username};
    for(let i in wordsArr){
        if(binarySearch(wordsArr[i].toLowerCase())){
            switch(wordsArr[i].length){
                case 3: newList.words.push(wordsArr[i]);
                newList.score += 1;
                break;
                case 4: newList.words.push(wordsArr[i]);
                newList.score += 2;
                break;
                case 5: newList.words.push(wordsArr[i]);
                newList.score += 3;
                break;
                case 6: newList.words.push(wordsArr[i]);
                newList.score += 4;
                break;
                case 7: newList.words.push(wordsArr[i]);
                newList.score += 5;
                break;
                case 8: newList.words.push(wordsArr[i]);
                newList.score += 7;
                break;
                case 9: newList.words.push(wordsArr[i]);
                newList.score += 8;
                break;
                default: newList.words.push(wordsArr[i]);
                newList.score += 10;
                break;
            }
        }
    }

    return newList;
}

const randomLetters = () => {
    const ltrArr = [];
    // const ltrArr = [
        //     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        //     'N', 'O', 'P', 'Qu', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        // ];
        
        const ltrDice = [
            ['A','A','E','E','G','N'],
            ['A','B','B','J','O','O'],
            ['A','C','H','O','P','S'],
            ['A','F','F','K','P','S'],
            ['A','O','O','T','T','W'],
            ['C','I','M','O','T','U'],
            ['D','E','I','L','R','X'],
            ['D','E','L','R','V','Y'],
            ['D','I','S','T','T','Y'],
            ['E','E','G','H','N','W'],
            ['E','E','I','N','S','U'],
            ['E','H','R','T','V','W'],
            ['E','I','O','S','S','T'],
            ['E','L','R','T','T','Y'],
            ['H','I','M','N','U','Qu'],
            ['H','L','N','N','R','Z']
    ];
    
    ltrDice.forEach(die => {
        ltrArr.push(die[Math.floor(Math.random() * 6)])
    });

    let currentIndex = ltrArr.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = ltrArr[currentIndex];
        ltrArr[currentIndex] = ltrArr[randomIndex];
        ltrArr[randomIndex] = temporaryValue;
    }

    return ltrArr;
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
        
        // send refreshed room list every minute
        const emitGames = setInterval(() => {
            findRooms(io, socket);
        }, 60000);

        // Refreshes game list on landing page manually
        socket.on('refresh-list', () => {
            findRooms(io, socket);
        });
        
        // create room
        socket.on('create-room', (room, createRoom) => {
            // If room exists will ask user to confirm if they want to try and join
            for(let key in io.sockets.adapter.rooms){
                if(key === room){
                    return createRoom({msg: 'Room already exists.  Would you like to request access?', room: room})
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
                socket.roomOwner = true;
                createRoom({username: socket.username, score: 0});
            });
        });
        
        // join room
        socket.on('join-room', (room, joinRoom) => {
            // Sends mesage back to user if room doesn't exist.  Will create new room with the name they used if confirmed
            let foundRoom;
            for(let key in io.sockets.adapter.rooms){
                if(key === room){
                    foundRoom = true;
                    break;
                }
            }

            if(!foundRoom){            
                return joinRoom({msg: 'Room does not exist.  Would you like to create it?', room: room})
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
                socket.room = room;
                socket.to(room).emit('chat', {msg: `${socket.username} has entered the room!`, username: 'SERVER UNDERLORDS'});
                joinRoom(findPlayersInRoom(io, socket));
            });
        });

        // Verify words and set score
        socket.on('word-list', (words, sendScore) => {
            socket.ready = false;
            const newScore = verifyWords(socket, words);
            socket.to(socket.room).emit('scores', newScore);
            sendScore(newScore);
        });

        // 
        socket.on('players-in-room', joined => {
            socket.to(socket.room).emit('join', findPlayersInRoom(io, socket));
        });

        // Leave room
        socket.on('leave-room', confirmLeave => {
            socket.leave(socket.room, () => {
                confirmLeave(socket.room);
            });
        });

        // Send new set of letters
        socket.on('ready', ready => {
            socket.ready = true;

            if(playersReady(io, socket).length >= findPlayersInRoom(io, socket).length){
                const newLetters = randomLetters();
                ready(newLetters);
                socket.to(socket.room).emit('new-letters', newLetters);
            }
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
