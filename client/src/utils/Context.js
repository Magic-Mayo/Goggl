import React, {useState, useEffect, createContext} from 'react';
import io from 'socket.io-client';
import {useBrowserTimeout} from './hooks'

export const SocketContext = createContext(null);

export default ({children}) => {
    const [socket, setSocket] = useState();
    const [letterArray, setLetterArray] = useState([]);
    const [players, setPlayers] = useState([]);
    const [username, setUsername] = useState('');
    const [games, setGames] = useState([]);
    const [chat, setChat] = useState([]);
    const [updatedScores, setUpdatedScores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isChatShowing, setIsChatShowing] = useState({
        showing: false,
        unread: 0
    });
    const [isActive, setIsActive] = useState(true);
    const [notConnected, setNotConnected] = useState(true);
    const [isKeypressed, isMouseMoving, setIsKeypressed, setIsMouseMoving] = useBrowserTimeout();

    const resetActive = () => {
        setIsMouseMoving(false);
        setIsKeypressed(false);
        setNotConnected(false);
        setIsActive(true);
    }

    useEffect(() => {
        setSocket(() => process.env.NODE_ENV === 'production' ? io('http://127.0.0.1:3001', {path: '/goggl/socket.io', }) : io(':3001'));

        return () => socket !== undefined ? socket.close() : null;
    }, [setSocket]);

    useEffect(() => {
        if(socket !== undefined){
            socket.on('games-list', gameList => {
                setGames(gameList);
            });

            socket.on('chat', chat => {
                setIsChatShowing(prevState => ({...prevState, unread: prevState.showing ? prevState.unread : prevState.unread + 1}))
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
        }

        return () => {
            if(socket !== undefined){
                socket.off('game-scores');
                socket.off('players-in-room');
                socket.off('games-list');
                socket.off('new-letters');
                socket.off('scores');
            }
        }

    }, [socket]);

    useEffect(() => {
        if((isKeypressed || isMouseMoving) && isActive){
            const timer = setTimeout(() => {
                resetActive();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isKeypressed, isMouseMoving]);

    useEffect(() => {
        if(!isActive){
            const timedOut = setTimeout(() => {
                socket.emit('timed-out', true, notActive => {
                    setNotConnected(notActive);
                });

            }, 1200);

            return () => clearTimeout(timedOut);
        } else {
            resetActive();
        }
    }, [isActive]);

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
            isActive,
            notConnected,
            isChatShowing,
            setLoading,
            setUpdatedScores,
            setPlayers,
            setUsername,
            setGames,
            setChat,
            setLetterArray,
            setIsChatShowing,
            resetActive
        }}
        >
            {children}
        </SocketContext.Provider>
    )
} 