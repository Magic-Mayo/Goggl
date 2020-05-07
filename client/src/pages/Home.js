import React, {useState} from 'react';
import {Wrapper, Input, Button, P, Label} from '../components/styledComponents';
import {useHistory} from 'react-router-dom';
import Modal from '../components/Modal';
import Games from '../components/Games';

const Home = ({socket, setUsername}) => {
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
            socket.emit('join-room', input.room, create => {
                if(create){
                    setInput(prevInput => ({...prevInput, room: create.room}))
                    return setModal(create.msg);
                }
                
                history.push('/game');
            })
        });
    }
    
    const handleCreateRoom = () => {
        setCreateOrJoin(true);
        if(!input.username){
            return setInput();
        }
        
        socket.emit('set-username', input.username, username => {
            setUsername(username);
            socket.emit('create-room', input.room, join => {
                if(join){
                    setInput(prevInput => ({...prevInput, room: join.room}))
                    return setModal(join.msg);
                }

                history.push('/game');
            })
        })
    }

    const handleInput = e => {
        const {name, value} = e.target;
        setInput(prevInput => ({...prevInput, [name]: value}))
    }

    return (
        <>
            <Button
            onClick={() => {
                setViewGames(!viewGames);
                setInput({username: '', room: ''})
            }}
            w='300px'
            h='100px'
            position='fixed'
            top='0'
            left='50%'
            trans='translateX(-50%)'
            >
                {viewGames ? 'Join/Create Private Room' : 'See all games'}
            </Button>

            {viewGames ?
                <Wrapper
                w='100vw'
                h='100vh'
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
                >
                    {modal && 
                        <Modal>
                            <P
                            fontS='18px'
                            >
                                {modal}
                            </P>
                            <Button
                            w='200px'
                            h='50px'
                            fontS='22px'
                            onClick={createOrJoin ? handleJoinRoom : handleCreateRoom}
                            >
                                {createOrJoin ? 'Join Room' : 'Create Room'}
                            </Button>
                        </Modal>
                    }

                    <Wrapper
                    flexDirection='column'
                    bgColor='rgba(50,50,50,.8)'
                    w='40vw'
                    h='50vh'
                    alignItems='center'
                    borderRadius='10px'
                    >
                        <Label
                        htmlFor='username'
                        fontS='32px'
                        >
                            Enter username
                        </Label>
                        <Input
                        placeholder={`If you don't enter one I will`}
                        onChange={e => handleInput(e)}
                        value={input.username}
                        name='username'
                        />

                        <>
                            <Label
                            htmlFor='room'
                            fontS='32px'
                            >
                                Enter room name
                            </Label>
                            <Input
                            placeholder='Room to join or create'
                            onChange={e => handleInput(e)}
                            value={input.room}
                            name='room'
                            />
                        </>

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
                    </Wrapper>
                </Wrapper>
            }
        </>
    )
}

export default Home;