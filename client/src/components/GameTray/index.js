import React, { useState, useContext, useEffect } from 'react';
import { Wrapper, Button, P } from '../styledComponents';
import {SocketContext} from '../../utils/Context';
import Loading from '../Loading';

const Tray = () => {
    const {socket, loading, players, scores, updatedScores, setUpdatedScores, setLoading, setScores} = useContext(SocketContext);
    const [letterArray, setLetterArray] = useState(['A','F','A','E','T','G','L','O','M','N','A','B','W','I','J','L'])
    const [chosenLetters, setChosenLetters] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [firstLetter, setFirstLetter] = useState();
    const [error, setError] = useState();

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

    const sendWordList = () => {
        setLoading(true);
        socket.emit('word-list', wordList);
    }

    useEffect(() => {
        if(updatedScores && players && updatedScores.length >= players.length){
            setScores(prevScores => {
                return updatedScores.map(score => {
                    for(let i in prevScores){
                        if(prevScores[i].username === score.username){
                            prevScores[i].score += score.score;
                        }
                    }
                });
            });
        }
    }, [updatedScores])

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
                <Loading />
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

                    <Wrapper
                    display='grid'
                    bgColor='#d96a45'
                    borderRadius='20px'
                    margin={error ? '0' : '0 25px'}
                    >
                            <Button
                            w='275px'
                            h='75px'
                            margin='10px 10px 40px'
                            onClick={handleWordSubmit}
                            >
                                Submit Word!
                            </Button>

                            <Wrapper
                            display='grid'
                            bgColor='#d96a45'
                            borderRadius='20px'
                            >
                                {letterArray.map((letter, ind) => (
                                    <Button
                                    key={ind}
                                    onClick={() => handleClick(ind)}
                                    border='1px solid #fff'
                                    bgColor={chosenLetters.includes(ind) ? '#00509c' : '#fcfcfa'}
                                    fontColor={chosenLetters.includes(ind) ? '#fcfcfa' : '#00509c'}
                                    fontS='50px'
                                    fontW='bold'
                                    >
                                        {`${letter} ${firstLetter === ind ? 'asdf' : ''}`}
                                    </Button>
                                ))}
                            </Wrapper>
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

export default Tray;