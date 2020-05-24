import React, { useState, useEffect } from 'react';
import { Wrapper, P } from '../styledComponents';

const ScoreBox = ({socket}) => {
    const [scores, setScores] = useState([{username: 'dummy', score: 56}, {username: 'dummy', score: 56},{username: 'dummy', score: 56},{username: 'dummy', score: 56}]);

    useEffect(() => {
        socket.on('game-scores', score => {
            setScores(score);
        });
    }, []);

    return (
        <Wrapper
        w='250px'
        minWidth='125px'
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
        </Wrapper>
    )
}

export default ScoreBox;