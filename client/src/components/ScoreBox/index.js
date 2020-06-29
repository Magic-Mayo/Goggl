import React, { useContext } from 'react';
import { Wrapper, P, Button } from '../styledComponents';
import { SocketContext } from '../../utils/Context';

const ScoreBox = ({windowWidth, showScores}) => {
    const {players} = useContext(SocketContext);

    return (
        <Wrapper
        w={windowWidth < 600 ? '80vw' : '250px'}
        h='80vh'
        bgColor='rgba(221,221,238,.9)'
        border='2px solid #cdcdcd'
        flexDirection='column'
        justifyContent='flex-start'
        className='scroller no-cursor'
        overflowY='auto'
        position={windowWidth < 600 ? 'fixed' : ''}
        transForm={windowWidth < 600 ? showScores ? 'translate(-50%, -50%)' : 'translate(-800px, -50%)' : ''}
        left={windowWidth < 600 ? '50%' : ''}
        top={windowWidth < 600 ? '50%' : ''}
        >
            {players.length > 0 &&
                players.map((player, ind) => (
                    <Wrapper
                    key={ind}
                    h='50px'
                    w='100%'
                    bgColor={ind % 2 === 0 ? 'rgba(85,85,85,.5)' : ''}
                    borderBottom='2px solid #ccc'
                    >
                        <P>
                            {player.username}: {player.score}
                        </P>
                    </Wrapper>
                ))
            }

        </Wrapper>
    )
}

export default ScoreBox;