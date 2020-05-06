import React, { useRef, useState } from 'react';
import io from 'socket.io-client';
import {Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

const App = () => {
    const {current: socket} = useRef(io(':3001'));
    const [username, setUsername] = useState();

    return (
        <>
            <Route exact path='/'>
                <Home
                username={username}
                setUsername={setUsername}
                socket={socket}
                />
            </Route>
            <Route path='/game'>
                {!username && <Redirect to='/' />}
                <Game
                username={username}
                socket={socket}
                />
            </Route>
        </>
    );
}

export default App;
