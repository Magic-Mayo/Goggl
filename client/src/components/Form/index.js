import React, {useRef, useEffect} from 'react';
import {Wrapper, Input, Label} from '../styledComponents';

const Form = ({children, handleInput, input, windowWidth}) => {
    const ref = useRef();

    useEffect(() => {
        if(ref.current){
            ref.current.focus();
        }
    }, [ref])

    return (
        <Wrapper
        flexDirection='column'
        bgColor='rgba(50,50,50,.8)'
        w={windowWidth < 600 ? '80vw' : '40vw'}
        h={windowWidth < 600 ? '70vh' : '50vh'}
        alignItems='center'
        borderRadius='10px'
        >
            <Label
            htmlFor='username'
            fontS='32px'
            >
                Enter username
            </Label>
            <Input
            w={windowWidth < 600 ? '75vw' : ''}
            placeholder={`If you don't enter one I will`}
            onChange={e => handleInput(e)}
            value={input.username}
            name='username'
            ref={ref}
            />

            <Label
            htmlFor='room'
            fontS='32px'
            >
                Enter room name
            </Label>
            <Input
            w={windowWidth < 600 ? '75vw' : ''}
            placeholder='Room to join or create'
            onChange={e => handleInput(e)}
            value={input.room}
            name='room'
            />

            {children}
        </Wrapper>
    )
}

export default Form;