import React, { useContext, useState, useEffect } from 'react';
import {SocketContext} from './utils/Context';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { P, Button } from './components/styledComponents';
import Modal from './components/Modal';

const App = () => {
    const {username, isActive, notConnected, resetActive} = useContext(SocketContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsModalOpen(() => {
            if(!isActive || notConnected){
                return true;
            }
        })
    }, [isActive, notConnected])

    return (
        <>
            {isModalOpen &&
                <Modal
                width='450px'
                height='300px'
                justify='space-evenly'
                >
                    <P
                    fontS='28px'
                    >
                        {notConnected && 'You have been disconnected from the server for inactivity'}
                        {!isActive && !notConnected && 'Are you still there??'}
                    </P>

                    {notConnected &&
                        <Button
                        w='175px'
                        onClick={resetActive}
                        >
                            Reconnect me
                        </Button>
                    }

                    {!isActive && !notConnected &&
                        <Button
                        onClick={resetActive}
                        >
                            Still here!
                        </Button>
                    }
                </Modal>
            }
            <Switch>
                <Route exact path='/games/goggl/'>
                    <Home />
                </Route>
                <Route path='/games/goggl/game'>
                    {!username && <Redirect to='/games/goggl/' />}
                    <Game />
                </Route>
                <Redirect to='/games/goggl/' />
            </Switch>
        </>    
    );
}

export default App;
