import React, { useState, useContext } from 'react';
import {Wrapper, Form, Input, P} from '../styledComponents';
import { SocketContext } from '../../utils/Context';

const ChatBox = ({socket, username, windowWidth, showChat}) => {
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
            justifyContent='space-between'
            w={windowWidth < 600 ? '80vw' : '350px'}
            minWidth='250px'
            h='80vh'
            position={windowWidth < 600 ? 'fixed' : ''}
            right={windowWidth < 600 ? '50%' : ''}
            top={windowWidth < 600 ? '50%' : ''}
            transForm={windowWidth < 600 ? showChat ? 'translate(50%, -50%)' : 'translate(800px, -50%)' : ''}
            >

                <Wrapper
                w='100%'
                h='90%'
                border=' 2px solid #ccc'
                flexDirection='column'
                justifyContent='flex-start'
                bgColor='rgba(221,221,238,.9)'
                overflowY='scroll'
                overflowX='hidden'
                className='scroller no-cursor'
                >
                    {chat &&
                        chat.map((chat, ind) => (
                            <Wrapper
                            key={ind}
                            position='relative'
                            transForm={chat.username === username ? 'translateX(70px)' : chat.username === 'server' ? 'translateX(35px)' : ''}
                            w='80%'
                            borderRadius='10%'
                            margin='5px'
                            padding='0 7px'
                            bgColor={chat.username === username ? '#2fc' : chat.username === 'server' ? '#ccc' : '#cf2'}
                            justifyContent={chat.username === username ? 'flex-end' : chat.username === 'server' ? 'center' : 'flex-start'}
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
                w='100%'
                >
                    <Input
                    placeholder='Enter chat'
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    margin='0'
                    bgColor='rgba(221,221,238,.9)'
                    w='100%'
                    />
                </Form>
            </Wrapper>
        </>
    )
}

export default ChatBox;