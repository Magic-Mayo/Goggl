import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Wrapper, Button } from '../components/styledComponents';
import GameTray from '../components/GameTray';
import ScoreBox from '../components/ScoreBox';
import ChatBox from '../components/ChatBox';
import { SocketContext } from '../utils/Context';
import { useWindowDimensions } from '../utils/hooks';

const Game = () => {
    const history = useHistory();
    const {socket, username, isChatShowing, setPlayers, setIsChatShowing} = useContext(SocketContext);
    const [windowWidth] = useWindowDimensions();
    const [showChat, setShowChat] = useState(windowWidth < 600 ? false : true);
    const [showScores, setShowScores] = useState(windowWidth < 600 ? false : true);

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
    }, []);

    return (
        <>
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
            
            <Wrapper
            w='100vw'
            h='100vh'
            flexDirection={windowWidth < 600 ? 'column' : 'row'}
            justifyContent={windowWidth < 600 ? 'center' : 'space-between'}
            alignItems={windowWidth < 600 ? 'center' : 'flex-end'}
            padding='0 10px 30px'
            >

                <ScoreBox
                socket={socket}
                windowWidth={windowWidth}
                showScores={showScores}
                />

                <GameTray
                windowWidth={windowWidth}
                />

                <ChatBox
                username={username}
                socket={socket}
                windowWidth={windowWidth}
                showChat={showChat}
                />

                {windowWidth < 600 &&
                    <Wrapper
                    position='absolute'
                    bottom='0'
                    >
                        <Button
                        h='60px'
                        onClick={() => setShowScores(prevState => !prevState)}
                        >
                            Scores
                        </Button>

                        <Button
                        h='60px'
                        onClick={() => {
                            setShowChat(prevState => !prevState);
                            setIsChatShowing(prevState => ({unread: showChat ? 0 : prevState, showing: !prevState.showing}));
                        }}
                        position='relative'
                        >
                            Chat
                            {!isChatShowing.showing && isChatShowing.unread > 0 &&
                                <Wrapper
                                bgColor='red'
                                borderRadius='50%'
                                w='40px'
                                h='40px'
                                position='absolute'
                                top='-16px'
                                right='-16px'
                                >
                                    {isChatShowing.unread}
                                </Wrapper>
                            }
                        </Button>
                    </Wrapper>
                }
            </Wrapper>
        </>
    )
}

export default Game;