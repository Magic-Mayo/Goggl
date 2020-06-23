import React, { useContext } from 'react';
import {SocketContext} from './utils/Context';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

const App = () => {
    const {username} = useContext(SocketContext);

    return (
        <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            <Route path='/game'>
                {!username && <Redirect to='/' />}
                <Game />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
}

export default App;
