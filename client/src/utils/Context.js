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
    const [scores, setScores] = useState([]);
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');
    const [games, setGames] = useState([]);
    const [chat, setChat] = useState([]);
    const [updatedScores, setUpdatedScores] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        socket.on('game-scores', score => {
            setScores(score);
        });

        socket.on('games-list', gameList => {
            setGames(gameList);
        });

        socket.on('chat', chat => {
            setChat(prevChat => [...prevChat, {msg: chat.msg, username: chat.username}]);
        });

        socket.on('join', findPlayers => {
            setPlayers(prevPlayers => [...prevPlayers, findPlayers]);
        });

        socket.on('scores', playerScores => {
            setUpdatedScores(prevUpdatedScores => [...prevUpdatedScores, playerScores]);
        })

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
            scores,
            updatedScores,
            players,
            username,
            games,
            chat,
            setLoading,
            setScores,
            setUpdateScores: setUpdatedScores,
            setPlayers,
            setUsername,
            setGames,
            setChat
        }}
        >
            {children}
        </SocketContext.Provider>
    )
} 