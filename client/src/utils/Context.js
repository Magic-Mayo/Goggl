import React, {useState, useEffect, createContext} from 'react';
import io from 'socket.io-client';

let socket;

if(process.env.NODE_ENV === 'production'){
    socket = io();
} else {
    socket = io(':3001');
}

export const SocketContext = createContext(null);

export default ({children}) => {
    const [letterArray, setLetterArray] = useState([]);
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');
    const [games, setGames] = useState([]);
    const [chat, setChat] = useState([]);
    const [updatedScores, setUpdatedScores] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        
        socket.on('games-list', gameList => {
            setGames(gameList);
        });

        socket.on('chat', chat => {
            setChat(prevChat => [...prevChat, {msg: chat.msg, username: chat.username ? chat.username : 'server'}]);
        });

        socket.on('join', findPlayers => {
            setPlayers(findPlayers);
        });

        socket.on('scores', playerScores => {
            setUpdatedScores(prevUpdatedScores => [...prevUpdatedScores, playerScores]);
        });

        socket.on('new-letters', newLetters => {
            setLetterArray(newLetters);
        });

        return () => {
            socket.off('game-scores');
            socket.off('players-in-room');
            socket.off('games-list');
        }

    }, []);

    return (
        <SocketContext.Provider
        value={{
            loading,
            socket,
            letterArray,
            updatedScores,
            players,
            username,
            games,
            chat,
            setLoading,
            setUpdatedScores,
            setPlayers,
            setUsername,
            setGames,
            setChat,
            setLetterArray
        }}
        >
            {children}
        </SocketContext.Provider>
    )
} 