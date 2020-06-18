import React, { useState, useContext, useEffect } from 'react';
import { Wrapper, Button, P } from '../styledComponents';
import {SocketContext} from '../../utils/Context';
import Loading from '../Loading';

const Tray = () => {
    const {socket, letterArray, loading, players, updatedScores, setPlayers, setLetterArray, setUpdatedScores, setLoading} = useContext(SocketContext);
    const [chosenLetters, setChosenLetters] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [firstLetter, setFirstLetter] = useState();
    const [error, setError] = useState();
    const [timer, setTimer] = useState(5);
    const [countdown, setCountdown] = useState({
        isOn: false,
        time: 3
    });

    const matrixId = {
        0: [0,0], 1: [0,1], 2: [0,2], 3: [0,3],
        4: [1,0], 5: [1,1], 6: [1,2], 7: [1,3],
        8: [2,0], 9: [2,1], 10: [2,2], 11: [2,3],
        12: [3,0], 13: [3,1], 14: [3,2], 15: [3,3]
    }

    const handleClick = idx => {
        setError();
        setChosenLetters(prevLetters => {
            const newArr = [...prevLetters];
            const mxStr = matrixId[idx].join(',')
            const index = newArr.indexOf(mxStr);
            const lastLetter = prevLetters[prevLetters.length - 1];
            
            // if array is empty no letter has been clicked. set current click to array
            if(lastLetter === undefined) return [mxStr];

            // checks if letter in same position is in state
            if(index !== -1){
                // checks if it was the last letter clicked
                if(index === newArr.length - 1 || index === newArr.length - 2){
                    // if it was the last or next to last letter remove it
                    newArr.pop();
                    return newArr;
                } else {
                    // if not the last letter clicked then just return that letter
                    return [mxStr];
                }
            }

            // uses matrix to check if letter clicked is next to last letter in array
            if(Math.abs(parseInt(lastLetter.split(',')[0]) - matrixId[idx][0]) < 2 && Math.abs(parseInt(lastLetter.split(',')[1]) - matrixId[idx][1]) < 2) return [...prevLetters, mxStr]

            return [mxStr];
        });
    }

    const handleWordSubmit = () => {
        if(chosenLetters.length < 3) return setError('Word must be at least 3 letters long!');

        setWordList(prevWords => {
            const newWord = [];
            
            chosenLetters.forEach(letter => {
                for(let key in matrixId){
                    if(matrixId[key].join(',') === letter){
                        newWord.push(letterArray[key])
                    }
                }
            });

            return [...prevWords, newWord.join('').toLowerCase()]
        })
        setChosenLetters([]);
    }

    const handleReady = () => {
        socket.emit('ready', letters => setLetterArray(letters));
    }

    const sendWordList = () => {
        setLoading(true);
        socket.emit('word-list', wordList, newScore => setUpdatedScores(prevUpdatedScores => [...prevUpdatedScores, newScore]));
    }

    const startCoutdown = () => {
        setCountdown(prevState => ({...prevState, isOn: true}));
    }

    useEffect(() => {
        if(updatedScores.length && updatedScores.length >= players.length){
            
            setPlayers(prevScores => {
                let newScores;
                
                updatedScores.map(score => {
                    prevScores.forEach(player => {
                        if(player.username === score.username){
                            score.score += player.score;
                            newScores = {score: score.score, username: score.username};
                        }
                    });

                });
                return newScores;
            });
        }
    }, [updatedScores]);

    useEffect(() => {
        if(letterArray.length) startCoutdown();
    }, [letterArray]);

    useEffect(() => {
        if(countdown.time < 1){
            setCountdown({time: 3, isOn: false});
            return setLoading(false);
        }

        const countdownInterval = setInterval(() => {
            setCountdown(prevState => ({...prevState, time: prevState.isOn ? prevState.time - 1 : 3}));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown]);

    useEffect(() => {
        if(loading) return;

        if(timer < 1){
            setTimer(120);
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
        h='80vh'
        justifyContent='space-evenly'
        position='fixed'
        left='50%'
        top='50%'
        transform='translate(-50%, -50%)'
        >

            {loading ?
                <>
                    <Button
                    w='275px'
                    h='75px'
                    onClick={handleReady}
                    >
                        Ready!
                    </Button>
                    {countdown.isOn ?
                        <P>{countdown.time}</P>
                    :
                        <Loading />
                    }
                </>
            :
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

                    {error &&
                        <P
                        bgColor='rgba(0,0,0,.7)'
                        padding='5px'
                        margin='0 0 -20px'
                        fontColor='red'
                        fontS='32px'
                        >
                            {error}
                        </P>
                    }

                    <Wrapper
                    display='grid'
                    bgColor='#d96a45'
                    borderRadius='20px'
                    margin={error ? '0' : '5px 0 0'}
                    >
                        {letterArray.map((letter, idx) => (
                                <Button
                                key={idx}
                                onClick={() => handleClick(idx)}
                                border='1px solid #fff'
                                bgColor={chosenLetters.includes(matrixId[idx].join(',')) ? '#00509c' : '#fcfcfa'}
                                fontColor={chosenLetters.includes(matrixId[idx].join(',')) ? '#fcfcfa' : '#00509c'}
                                fontS='50px'
                                fontW='bold'
                                >
                                    {`${letter} ${firstLetter === idx ? 'asdf' : ''}`}
                                </Button>
                        ))}
                    </Wrapper>
                    <Wrapper>
                        <P>
                            {
                                timer < 120 ?
                                timer < 60 ? `0:${timer}` :
                                `1:${timer % 60}` :
                                '2:00'
                            }
                            left
                        </P>
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

export default Tray;