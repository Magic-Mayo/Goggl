import React, {useState} from 'react';
import {Wrapper, Input, Button} from '../components/styledComponents';
import { useHistory } from 'react-router-dom';


const Home = ({socket, setUsername}) => {
    const history = useHistory();
    const [input, setInput] = useState('');
    
    const handleUsername = () => {
        socket.emit('set-username', input, chat => {
            setUsername(chat);
            history.push('/game');
        });
    }

    return (
        <Wrapper margin='80px 0 0 0'>
            <Wrapper>
                <Input
                onChange={e => setInput(e.target.value)}
                value={input}
                />
                <Button
                type='button'
                onClick={handleUsername}
                >
                    Send name
                </Button>
            </Wrapper>
        </Wrapper>
    )
}

export default Home;