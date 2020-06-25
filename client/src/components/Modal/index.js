import React from 'react';
import { Wrapper } from '../styledComponents';

const Modal = ({children, setIsModalOpen}) => {

    return (
        <>
            <Wrapper
            position='fixed'
            w='100vw'
            h='100vh'
            onClick={() => setisModalOpen(false)}
            />

            <Wrapper
            position='fixed'
            zIndex='100'
            left='50%'
            transForm='translateX(-50%)'
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
        </>
    )
}

export default Modal;