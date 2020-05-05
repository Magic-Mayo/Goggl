import React, {useState} from 'react';
import {Wrapper, Input, Button} from '../components/styledComponents';
import ChatBox from '../components/ChatBox';

const Home = ({socket}) => {
    const [username, setUsername] = useState('');
    
    const handleUsername = () => {
        socket.emit('set-username', username, chat => setUsername(chat))
    }

    return (
        <Wrapper margin='80px 0 0 0'>
            <Wrapper>
                <Input
                onChange={e => setUsername(e.target.value)}
                value={username}
                />
                <Button
                type='button'
                onClick={handleUsername}
                >
                    Send name
                </Button>
            </Wrapper>

            <Wrapper>
                <ChatBox
                socket={socket}
                username={username}
                />
            </Wrapper>
        </Wrapper>
    )
}

export default Home;