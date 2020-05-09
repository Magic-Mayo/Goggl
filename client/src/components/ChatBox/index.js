import React, { useState, useEffect, useContext } from 'react';
import {Wrapper, Form, Input, P} from '../styledComponents';
import { SocketContext } from '../../utils/Context';

const ChatBox = ({socket, username}) => {
    const [input, setInput] = useState('');
    const {chat, setChat} = useContext(SocketContext);
    
    const handleChat = e => {
        e.preventDefault();
        socket.emit('chat', input);
        setChat(prevChat => [...prevChat, {msg: input, username: username}]);
        setInput('');
    }

    return (
        <>
            <Wrapper
            flexDirection='column'
            alignItems='flex-end'
            w='350px'
            >

                <Wrapper
                w='400px'
                h='700px'
                border=' 2px solid #ccc'
                margin='20px 0'
                flexDirection='column'
                justifyContent='flex-start'
                bgColor='rgba(221,221,238,.9)'
                overflowY='auto'
                >
                    {chat &&
                        chat.map((chat, ind) => (
                            <Wrapper
                            key={ind}
                            position='relative'
                            transform={chat.username === username ? 'translateX(70px)' : ''}
                            w='80%'
                            borderRadius='10%'
                            margin='5px'
                            padding='0 7px'
                            bgColor={chat.username === username ? '#2fc' : '#cf2'}
                            justifyContent={chat.username === username ? 'flex-end' : 'flex-start'}
                            >
                                <P
                                margin='5px'
                                fontColor={chat.username !== username ? '#000' : '#f3a'}
                                >
                                    {chat.username !== username ? `${chat.username}: ${chat.msg}` : chat.msg}
                                </P>
                            </Wrapper>
                        ))
                    }
                </Wrapper>

                <Form
                onSubmit={e => handleChat(e)}
                alignItems='flex-end'
                >
                    <Input
                    placeholder='Enter chat'
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    margin='0'
                    bgColor='rgba(221,221,238,.9)'
                    />
                </Form>
            </Wrapper>
        </>
    )
}

export default ChatBox;