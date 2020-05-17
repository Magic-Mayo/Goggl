import React, { useContext } from 'react';
import { Wrapper, P } from '../styledComponents';
import { SocketContext } from '../../utils/Context';

const ScoreBox = () => {
    const {scores, players} = useContext(SocketContext);

    return (
        <Wrapper
        w='400px'
        h='80vh'
        bgColor='rgba(221,221,238,.9)'
        border='2px solid #cdcdcd'
        flexDirection='column'
        justifyContent='flex-start'
        className='scroller no-cursor'
        overflowY='scroll'
        >
            {scores &&
                scores.map((score, ind) => (
                    <Wrapper
                    key={ind}
                    h='50px'
                    w='100%'
                    bgColor={ind % 2 === 0 ? 'rgba(85,85,85,.5)' : ''}
                    borderBottom='2px solid #ccc'
                    >
                        <P>
                            {score.username}: {score.score}
                        </P>
                    </Wrapper>
                ))
            }

            {!scores && players &&
                players.map((player, ind) => (
                    <Wrapper
                    key={ind}
                    h='50px'
                    w='100%'
                    bgColor={ind % 2 === 0 ? 'rgba(85,85,85,.5)' : ''}
                    borderBottom='2px solid #ccc'
                    >
                        <P>
                            {player}: 0
                        </P>
                    </Wrapper>
                ))
            }
        </Wrapper>
    )
}

export default ScoreBox;