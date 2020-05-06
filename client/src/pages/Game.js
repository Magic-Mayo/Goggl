import React from 'react';
import {useHistory} from 'react-router-dom';
import { Wrapper, Button } from '../components/styledComponents';
import GameTray from '../components/GameTray';
import ScoreBox from '../components/ScoreBox';
import ChatBox from '../components/ChatBox';

const Game = ({socket, username}) => {
    const history = useHistory();

    const handleLeaveRoom = () => {
        socket.emit('leave-room', () => {
            history.push('/')        ;
        })
    }

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
            <ScoreBox />
            <GameTray />
            <ChatBox
            username={username}
            socket={socket}
            />
        </Wrapper>
    )
}

export default Game;