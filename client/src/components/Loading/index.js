import React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotateZ(0deg);
    }

    to {
        transform: rotateZ(359deg);
    }
`

const LoadingDiv = styled.div`
    border: #000 7px solid;
    border-top: none;
    border-left: none;
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
`

const Loading = () => <LoadingDiv />;

export default Loading;