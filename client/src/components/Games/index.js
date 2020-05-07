import React, { useEffect, useState } from 'react';
import { Wrapper, P } from '../styledComponents';
import { useHistory } from 'react-router-dom';

const Games = ({socket}) => {
    const history = useHistory();
    const [games, setGames] = useState();

    const handleJoin = room => {
        socket.emit('join-room', room, () => {
            history.push('/game');
        })
    }

    useEffect(() => {
        socket.on('game-list', gameList => {
            setGames(gameList);
        });
    }, []);

    return (
        <Wrapper
        w='700px'
        h='70vh'
        bgColor='rgba(50,50,50,.8)'
        flexDirection='column'
        justifyContent='flex-start'
        padding='0 20px'
        >
            <Wrapper
            justifyContent='space-around'
            fontColor='white'
            >
                <P
                fontS='24px'
                >
                    Room name
                </P>

                <P
                fontS='24px'
                >
                    Room creator
                </P>

                <P
                fontS='24px'
                >
                    Players in room
                </P>
            </Wrapper>
            <Wrapper
            flexDirection='column'
            justifyContent='flex-start'
            alignItems='center'
            overflowY='scroll'
            className='scroller'
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

                            <P
                            fontS='24px'
                            >
                                {game.creator}
                            </P>

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