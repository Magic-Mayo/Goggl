import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {Wrapper, Input, Button, P, Label} from '../components/styledComponents';
import Form from '../components/Form';
import Modal from '../components/Modal';
import Games from '../components/Games';
import { SocketContext } from '../utils/Context';

const Home = () => {
    const {socket, setPlayers, setUsername} = useContext(SocketContext);
    const history = useHistory();
    const [input, setInput] = useState({
        room: '',
        username: ''
    });
    const [modal, setModal] = useState();
    const [createOrJoin, setCreateOrJoin] = useState(false);
    const [viewGames, setViewGames] = useState(true);
    
    const handleJoinRoom = () => {
        setCreateOrJoin(false);
        if(!input.username){
            return setInput();
        }
        
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
        if(!input.username){
            return setInput();
        }
        
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
        <>
            <Button
            onClick={() => {
                setViewGames(!viewGames);
                setInput({username: '', room: ''})
                setModal();
            }}
            w='300px'
            h='100px'
            position='fixed'
            top='0'
            left='50%'
            trans='translateX(-50%)'
            margin='10px 0 0'
            >
                {viewGames ? 'Join/Create Private Room' : 'See all games'}
            </Button>

            {viewGames ?
                <Wrapper
                w='100vw'
                h='100vh'
                padding='100px 0 0'
                >
                    <Games
                    socket={socket}
                    setViewGames={setViewGames}
                    setInput={setInput}
                    />
                </Wrapper>
            :
                <Wrapper
                h='100vh'
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
                    >
                        <Wrapper
                        margin='25px 0 0'
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
        </>
    )
}

export default Home;