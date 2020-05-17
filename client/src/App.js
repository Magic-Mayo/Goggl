import React from 'react';
import SocketContext from './utils/Context';
import {Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

const App = () => {

    return (
        <div>
            <SocketContext>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route path='/game'>
                    {/* {!username && <Redirect to='/' />} */}
                    <Game />
                </Route>
            </SocketContext>
        </div>
    );
}

export default App;
