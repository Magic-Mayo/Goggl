import React from 'react';
import { Wrapper } from '../components/styledComponents';
import GameTray from '../components/GameTray';
import ScoreBox from '../components/ScoreBox';
import ChatBox from '../components/ChatBox';

const Game = ({socket, username}) => {

    return (
        <Wrapper
        w='100vw'
        h='100vh'
        justifyContent='space-evenly'
        >
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