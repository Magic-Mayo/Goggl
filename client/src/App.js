import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:3001';

const App = () => {

    return (
        <>
            <NavBar/>
            <Route exact path='/'>
                <Home socketIOClient={socketIOClient} ENDPOINT={ENDPOINT}/>
            </Route>
        </>
    );
}

export default App;
