import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Wrapper, Input, Button, P, Label} from '../components/styledComponents';
import Form from '../components/Form';
import Modal from '../components/Modal';
import Games from '../components/Games';
import { SocketContext } from '../utils/Context';
import { useWindowDimensions } from '../utils/hooks';
import Loading from '../components/Loading';

const Home = () => {
    const {socket, loading, setPlayers, setUsername, setLoading} = useContext(SocketContext);
    const history = useHistory();
    const [input, setInput] = useState({
        room: '',
        username: ''
    });
    const [modal, setModal] = useState();
    const [createOrJoin, setCreateOrJoin] = useState(false);
    const [viewGames, setViewGames] = useState(true);
    const [windowWidth, windowHeight] = useWindowDimensions();
    
    const handleJoinRoom = () => {
        setCreateOrJoin(false);
        
        socket.emit('set-username', input.username, username => {
            setUsername(username);
            socket.emit('join-room', input.room, join => {
                if(join.msg){
                    setInput(prevInput => ({...prevInput, room: join.room}));
                    return setModal(join);
                }
                
                setPlayers(join);
                history.push('/game');
            });
        });
    }
    
    const handleCreateRoom = () => {
        setCreateOrJoin(true);
        
        socket.emit('set-username', input.username, username => {
            setUsername(username);
            socket.emit('create-room', input.room, create => {
                if(create.msg){
                    setInput(prevInput => ({...prevInput, room: create.room}));
                    return setModal(create);
                }

                setPlayers([create]);
                history.push('/game');
            });
        });
    }

    const handleInput = e => {
        const {name, value} = e.target;
        setInput(prevInput => ({...prevInput, [name]: value}));
    }

    return (
        <Wrapper
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        >
            <Button
            onClick={() => {
                setViewGames(!viewGames);
                setInput({username: '', room: ''})
                setModal();
            }}
            w='300px'
            h='100px'
            margin='10px 0 50px'
            >
                {viewGames ? 'Join/Create Private Room' : 'See all games'}
            </Button>

            {viewGames ?
                <Wrapper
                w='100vw'
                justifyContent='center'
                >
                    <Games
                    socket={socket}
                    setViewGames={setViewGames}
                    setInput={setInput}
                    windowWidth={windowWidth}
                    />
                </Wrapper>
            :
                <Wrapper
                alignItems='center'
                justifyContent='center'
                >
                    {modal && 
                        <Modal>
                            <P
                            fontS='18px'
                            >
                                {modal.msg}
                            </P>
                            <Button
                            w='200px'
                            h='50px'
                            fontS='22px'
                            onClick={modal.full ? () => setModal() : createOrJoin ? handleJoinRoom : handleCreateRoom}
                            >
                                {modal.full ? 'Continue' : createOrJoin ? 'Join Room' : 'Create Room'}
                            </Button>
                        </Modal>
                    }

                    <Form
                    input={input}
                    handleInput={handleInput}
                    windowWidth={windowWidth}
                    >
                        <Wrapper
                        margin='25px 0 0'
                        flexDirection={windowWidth < 600 ? 'column' : ''}
                        >
                            <Button
                            type='button'
                            onClick={handleCreateRoom}
                            w='180px'
                            h='60px'
                            >
                                Create room
                            </Button>

                            <Button
                            type='button'
                            onClick={handleJoinRoom}
                            w='180px'
                            h='60px'
                            >
                                Join room
                            </Button>
                        </Wrapper>
                    </Form>
                </Wrapper>
            }
        </Wrapper>
    )
}

export default Home;