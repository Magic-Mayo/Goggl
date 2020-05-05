import React, { useRef } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import io from 'socket.io-client';

const App = () => {
    const {current: socket} = useRef(io(':3001'));

    return (
        <>
            <NavBar/>
            <Route exact path='/'>
                <Home socket={socket}/>
            </Route>
        </>
    );
}

export default App;
