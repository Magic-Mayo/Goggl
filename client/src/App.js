import React, { useRef, useState } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import io from 'socket.io-client';
import ChatBox from './components/ChatBox';
import Game from './components/Game';
import { Wrapper } from './components/styledComponents';

const App = () => {
    const {current: socket} = useRef(io(':3001'));
    const [username, setUsername] = useState();

    return (
        <>
            <NavBar/>
            <Route exact path='/'>
                <Home
                username={username}
                setUsername={setUsername}
                socket={socket}
                />
            </Route>
            <Route path='/game'>
                <Wrapper
                w='95vw'
                justifyContent='flex-end'
                margin='80px 0 0 0'
                >
                    <Game />
                    <ChatBox
                    username={username}
                    socket={socket}
                    />
                </Wrapper>
            </Route>
        </>
    );
}

export default App;
