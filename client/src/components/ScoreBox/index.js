import React, { useState } from 'react';
import { Wrapper, P } from '../styledComponents';

const ScoreBox = () => {
    const [scores, setScores] = useState([{username: 'dummy', score: 56}, {username: 'dummy', score: 56},{username: 'dummy', score: 56},{username: 'dummy', score: 56}]);

    return (
        <Wrapper
        w='400px'
        h='700px'
        bgColor='rgba(221,221,238,.9)'
        border='2px solid #cdcdcd'
        flexDirection='column'
        justifyContent='flex-start'
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