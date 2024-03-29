import React, { useContext } from 'react';
import { Wrapper, P, Button } from '../styledComponents';
import { SocketContext } from '../../utils/Context';

const Games = ({socket, setViewGames, setInput, windowWidth}) => {
    const {games} = useContext(SocketContext);

    const handleJoin = room => {
        setInput(prevInput => ({...prevInput, room: room}));
        setViewGames(false)
    }

    const handleRefresh = () => {
        socket.emit('refresh-list', () => {
            return;
        })
    }

    return (
        <Wrapper
        w={windowWidth < 600 ? '90vw' : '700px'}
        h='75vh'
        bgColor='rgba(50,50,50,.8)'
        flexDirection='column'
        justifyContent='flex-start'
        padding='0 20px'
        >
            <Button
            onClick={handleRefresh}
            w='50px'
            h='50px'
            borderRadius='50%'
            bgColor='transparent'
            boxShadow='none'
            fontS='16px'
            fontColor='white'
            >
                Refresh
            </Button>
            <Wrapper
            justifyContent='space-around'
            alignItems='flex-start'
            fontColor='white'
            >
                <P
                fontS='24px'
                >
                    Room {windowWidth >= 600 && 'name'}
                </P>

                {windowWidth >= 600 &&
                    <P
                    fontS='24px'
                    >
                        Room creator
                    </P>
                }

                <P
                fontS='24px'
                >
                    Players {windowWidth >= 600 && 'in room'}
                </P>
            </Wrapper>
            <Wrapper
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='center'
            overflowY='auto'
            className={`${games && games.length ? 'scroller' : 'no-cursor'}`}
            h='75%'
            >
                {games &&
                    games.map((game, ind) => (
                        <Wrapper
                        h='70px'
                        w='100%'
                        key={game.room}
                        justifyContent='space-around'
                        bgColor='inherit'
                        boxShadow='none'
                        borderTop='2px solid #ddd'
                        borderRadius='0'
                        fontColor='#ddd'
                        onClick={() => handleJoin(game.room)}
                        >
                            <P
                            fontS='24px'
                            >
                                {game.room}
                            </P>

                            {windowWidth > 599 &&
                                <P
                                fontS='24px'
                                >
                                    {game.creator}
                                </P>
                            }

                            <P
                            fontS='24px'
                            >
                                {game.numPlayers}
                            </P>
                        </Wrapper>
                    ))}
            </Wrapper>
        </Wrapper>
    )
}

export default Games;