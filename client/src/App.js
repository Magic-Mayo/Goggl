import React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';

const App = () => {
    return (
        <>
            <NavBar />
            <Route exact path='/'>
                <Home />
            </Route>
        </>
    );
}

export default App;
