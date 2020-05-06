import React, {useState} from 'react';
import {Wrapper, Input, Button, P} from '../components/styledComponents';
import {useHistory} from 'react-router-dom';
import Modal from '../components/Modal';

const Home = ({socket, setUsername}) => {
    const history = useHistory();
    const [input, setInput] = useState({
        room: '',
        username: ''
    });
    const [modal, setModal] = useState();
    const [createOrJoin, setCreateOrJoin] = useState(false);
    
    const handleJoinRoom = () => {
        setCreateOrJoin(false);
        if(!input.username){
            return setInput();
        }
        
        socket.emit('set-username', input.username, chat => {
            setUsername(chat);

            socket.emit('join-room', input.room, create => {
                if(create){
                    return setModal(create);
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

        socket.emit('set-username', input.username, chat => {
            setUsername(chat);
            socket.emit('create-room', input.room, join => {
                if(join){
                    return setModal(join);
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
        <Wrapper margin='80px 0 0 0'>
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
                        {setCreateOrJoin ? 'Join Room' : 'Create Room'}
                    </Button>
                </Modal>
            }
            <Wrapper>
                <Input
                onChange={e => handleInput(e)}
                value={input.username}
                name='username'
                />
                <Button
                type='button'
                onClick={handleCreateRoom}
                >
                    Send name
                </Button>
            </Wrapper>
        </Wrapper>
    )
}

export default Home;