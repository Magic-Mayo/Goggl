import React from 'react';
import { Wrapper } from '../styledComponents';

const Modal = ({children}) => {

    return (
        <Wrapper
        position='fixed'
        left='50%'
        transform='translateX(-50%)'
        top='30vh'
        w='300px'
        h='150px'
        bgColor='#3e1d5a'
        borderRadius='10px'
        flexDirection='column'
        alignItems='center'
        >
            {children}
        </Wrapper>
    )
}

export default Modal;