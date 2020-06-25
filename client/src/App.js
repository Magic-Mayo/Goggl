import React, { useContext } from 'react';
import {SocketContext} from './utils/Context';
import {Route, Redirect, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { P, Button } from './components/styledComponents';

const App = () => {
    const {username, isActive, notConnected, setIsActive, setNotConnected} = useContext(SocketContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {isModalOpen &&
                <Modal
                setIsModalOpen={setIsModalOpen}
                >
                    <P>
                        {notConnected && 'You have been disconnected from the server for inactivity'}
                        {!isActive && !notConnected && 'Are you still there??'}
                    </P>

                    {notConnected &&
                        <Button
                        onClick={() => }
                        >
                            Reconnect me
                        </Button>
                    }

                    {!isActive && !notConnected &&
                        <Button
                        onClick={() => setIsActive(true)}
                        >
                            Still here!
                        </Button>
                    }
                </Modal>
            }
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
        </>    
    );
}

export default App;
