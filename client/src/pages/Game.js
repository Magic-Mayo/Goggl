import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Wrapper, Button } from '../components/styledComponents';
import GameTray from '../components/GameTray';
import ScoreBox from '../components/ScoreBox';
import ChatBox from '../components/ChatBox';
import { SocketContext } from '../utils/Context';

const Game = () => {
    const history = useHistory();
    const {socket, username, setPlayers} = useContext(SocketContext);

    const handleLeaveRoom = () => {
        socket.emit('leave-room', () => {
            history.push('/');
        });

    }
    
    useEffect(() => {
        socket.emit('players-in-room', getPlayers => {
            setPlayers(getPlayers);
        });
        
        return () => socket.emit('refresh-list', () => null)
    }, [])

    return (
        <Wrapper
        w='100vw'
        h='100vh'
        justifyContent='space-evenly'
        >
            <Button
            w='200px'
            h='50px'
            fontS='20px'
            position='fixed'
            top='0'
            left='0'
            onClick={handleLeaveRoom}
            >
                Leave Room
            </Button>

            <ScoreBox
            socket={socket}
            />

            <GameTray />

            <ChatBox
            username={username}
            socket={socket}
            />
        </Wrapper>
    )
}

export default Game;