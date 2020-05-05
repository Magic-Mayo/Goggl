import React from 'react';
import { Wrapper, Button } from '../styledComponents';

const Tray = () => {

    return (
        <Wrapper
        display='grid'
        bgColor='#d96a45'
        borderRadius='20px'
        >
            {/* to be changed to map data from socket server */}
            {['A','F','A','E','T','G','L','O','M','N','A','B','W','I','J','L'].map((letter, ind) => (
                <Button
                key={ind}
                onClick={null}
                border='1px solid #fff'
                bgColor='#fcfcfa'
                fontColor='#00509c'
                fontS='50px'
                fontW='bold'
                >
                    {letter}
                </Button>
            ))}
        </Wrapper>
    )
}

export default Tray;