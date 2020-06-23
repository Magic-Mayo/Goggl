import React, { useState, useContext, useEffect } from 'react';
import { Wrapper, Button, P } from '../styledComponents';
import {SocketContext} from '../../utils/Context';
import Loading from '../Loading';

const Tray = ({windowWidth}) => {
    const {socket, letterArray, loading, players, updatedScores, setPlayers, setLetterArray, setUpdatedScores, setLoading} = useContext(SocketContext);
    const [chosenLetters, setChosenLetters] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [showBoard, setShowBoard] = useState(false);
    const [error, setError] = useState();
    const [timer, setTimer] = useState();
    const [countdown, setCountdown] = useState({
        isOn: false,
        time: 3
    });

    const handleClick = ind => {
        setError();
        setChosenLetters(prevLetters => {
            const newArr = [...prevLetters];
            const index = newArr.indexOf(ind);

            // checks if letter in same position is in state
            if(prevLetters.includes(ind)){
                
                // checks if it was the last letter clicked
                if(index === newArr.length - 1 || index === newArr.length - 2){
                    // if it was the last or next to last letter remove it
                    newArr.pop()
                    return newArr;
                } else {
                    // if not the last letter clicked then just return that letter
                    return [ind];
                }

            }
            return [...prevLetters, ind]
        });
    }

    const handleWordSubmit = () => {
        if(chosenLetters.length < 3) return setError('Word must be at least 3 letters long!');

        setWordList(prevWords => {
            const newWord = []
            chosenLetters.forEach(letter => newWord.push(letterArray[letter]));

            return [...prevWords, newWord.join('')]
        })
        setChosenLetters([]);
    }

    const handleReady = () => {
        setLoading(true);
        socket.emit('ready', letters => setLetterArray(letters));
    }
    
    const handleCancelReady = () => {
        setLoading(false);
        socket.emit('cancel-ready', letters => setLetterArray(letters));
    }

    const sendWordList = () => {
        setLoading(true);
        setChosenLetters([]);
        socket.emit('word-list', [...new Set(wordList)], newScore => setUpdatedScores(prevUpdatedScores => [...prevUpdatedScores, newScore]));
    }

    const startCoutdown = () => {
        setUpdatedScores([]);
        setCountdown(prevState => ({...prevState, isOn: true}));
        setLoading(false);
    }

    useEffect(() => {
        setPlayers(prevScores => {
            if(updatedScores.length && updatedScores.length >= players.length){
                const newScores = [];
                
                updatedScores.map(score => {
                    prevScores.forEach(player => {
                        if(player.username === score.username){
                            score.score += player.score;
                            newScores.push({score: score.score, username: score.username});
                        }
                    });

                });
                return newScores;
            }

            return prevScores;
        });
    }, [updatedScores]);

    useEffect(() => {
        if(letterArray.length > 0) startCoutdown();
    }, [letterArray]);

    useEffect(() => {
        if(!countdown.isOn) return;

        const countdownInterval = setInterval(() => {
            setCountdown(prevState => ({...prevState, time: prevState.isOn ? prevState.time - 1 : 3}));
        }, 1000);
        
        if(countdown.time < 1){
            setCountdown({time: 3, isOn: false});
            setTimer(120);
            clearInterval(countdownInterval);
            setShowBoard(true);
            return setLoading(false);
        }

        return () => clearInterval(countdownInterval);
    }, [countdown.time, countdown.isOn]);

    useEffect(() => {
        if(loading || letterArray.length === 0) return;

        if(timer < 1){
            setTimer(120);
            setShowBoard(false);
            return sendWordList();
        }

        const timerInterval = setInterval(() => {
            setTimer(prevTime => prevTime - 1);
        }, 1000)

        return () => clearInterval(timerInterval);
    }, [timer, loading])

    return (
        <Wrapper
        flexDirection='column'
        alignItems='center'
        justifyContent={loading ? 'center' : 'space-evenly'}
        justifyContent='space-evenly'
        position={windowWidth < 600 ? '' : 'fixed'}
        left='50%'
        top='50%'
        transForm={windowWidth < 600 ? '' : 'translate(-50%, -47%)'}
        w={windowWidth < 600 ? '95vw' : ''}
        >

            {countdown.isOn &&
                <Wrapper
                bgColor={`rgba(${countdown.time % 2 === 0 ? '0,0,0' : '255,0,0' }, .4)`}
                borderRadius='50%'
                padding='5px'
                w='160px'
                h='160px'
                >
                    <P
                    fontS='160px'
                    fontW='bold'
                    fontColor={countdown.time % 2 === 0 ? 'red' : ''}
                    >
                        {countdown.time}
                    </P>
                </Wrapper>
            }
            {letterArray.length === 0 && loading &&
                <>
                    <Button
                    w='275px'
                    h='75px'
                    bgColor='red'
                    onClick={handleCancelReady}
                    >
                        Cancel Ready
                    </Button>
                    <Loading />
                </>
            }
            {!showBoard &&
                <Button
                w='275px'
                h='75px'
                onClick={handleReady}
                >
                    Ready!
                </Button>
            }

            {showBoard &&
                <>
                    <Button
                    w='275px'
                    h='75px'
                    margin={error ? '0' : '10px 10px 40px'}
                    onClick={handleWordSubmit}
                    >
                        Submit Word!
                    </Button>
                
                
                    {error &&
                        <P
                        bgColor='rgba(0,0,0,.7)'
                        padding='5px'
                        margin='0'
                        fontColor='red'
                        fontS='24px'
                        >
                            {error}
                        </P>
                    }

                    <Wrapper
                    disp='grid'
                    bgColor='#d96a45'
                    borderRadius='20px'
                    margin='0 0 20px'
                    >
                        {letterArray.map((letter, ind) => (
                            <Button
                            key={ind}
                            w={windowWidth < 600 ? '75px' : ''}
                            h={windowWidth < 600 ? '75px' : ''}
                            margin={windowWidth < 600 ? '7px' : ''}
                            onClick={() => handleClick(ind)}
                            border='1px solid #fff'
                            bgColor={chosenLetters.includes(ind) ? '#00509c' : '#fcfcfa'}
                            fontColor={chosenLetters.includes(ind) ? '#fcfcfa' : '#00509c'}
                            fontS='50px'
                            fontW='bold'
                            >
                                {letter}
                            </Button>
                        ))}
                    </Wrapper>

                    <Wrapper
                    bgColor='rgba(0,0,0,0.4)'
                    padding='10px'
                    borderRadius='2px'
                    >
                        <P
                        fontS='32px'
                        fontColor={timer < 11 ? timer % 2 === 0 ? '#ddd' : 'red' : '#ddd'}
                        >
                            {timer < 120 ?
                            timer < 60 ? `0:${timer < 10 ? `0${timer}` : timer}` :
                            `1:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}` :
                            '2:00'}
                            {' '}
                            left
                        </P>
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

export default Tray;