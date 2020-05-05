import React, { useState, useEffect } from 'react';
import {Wrapper, Form, Input, P, Button} from '../styledComponents';

const ChatBox = ({socket, username}) => {
    const [chat, setChat] = useState([]);
    const [input, setInput] = useState('');
    
    const handleChat = e => {
        e.preventDefault();
        socket.emit('chat', input);
        setChat(prevChat => [...prevChat, {msg: input, username: username}]);
    }
    
    useEffect(() => {
        socket.on('chat', chat =>{
            setChat(prevChat => [...prevChat, {msg: chat.msg, username: chat.username}]);
        });
    }, [])

    return (
        <>
            <Wrapper
            flexDirection='column'
            >

                <Wrapper
                w='300px'
                h='600px'
                border=' 2px solid #ccc'
                margin='50px 0'
                flexDirection='column'
                justifyContent='flex-start'
                alignItems='flex-start'
                padding='0 5px'
                >
                    {chat &&
                        chat.map((chat, ind) => (
                            <P
                            key={ind}
                            w='100%'
                            textAlign={chat.username === username ? 'right' : 'left'}
                            >
                                {chat.username}: {chat.msg}
                            </P>
                        ))
                    }
                </Wrapper>

                <Form
                onSubmit={e => handleChat(e)}
                >
                    <Input
                    placeholder='Enter chat'
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    />
                </Form>
            </Wrapper>
        </>
    )
}

export default ChatBox;