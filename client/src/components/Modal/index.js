import React from 'react';
import { Wrapper } from '../styledComponents';

const Modal = ({children, width, height, justify}) => {

    return (
        <>
            <Wrapper
            position='fixed'
            w='100vw'
            h='100vh'
            bgColor='rgba(0,0,0,.4)'
            />

            <Wrapper
            position='fixed'
            zIndex='100'
            left='50%'
            transForm='translateX(-50%)'
            top='30vh'
            w={width || '300px'}
            h={height || '150px'}
            bgColor='#3e1d5a'
            borderRadius='10px'
            flexDirection='column'
            alignItems='center'
            padding='0 25px'
            justifyContent={justify || ''}
            >
                {children}
            </Wrapper>
        </>
    )
}

export default Modal;