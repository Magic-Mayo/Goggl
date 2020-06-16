import React, { useState, useContext, useEffect } from 'react';
import { Wrapper, Button, P } from '../styledComponents';
import {SocketContext} from '../../utils/Context';
import Loading from '../Loading';

const Tray = () => {
    const {socket, loading, players, scores, updatedScores, setUpdatedScores, setScores} = useContext(SocketContext);
    const [letterArray, setLetterArray] = useState(['A','F','A','E','T','G','L','O','M','N','A','B','W','I','J','L']);
    const [letterChosen, setLetterChosen] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [firstLetter, setFirstLetter] = useState();
    const [error, setError] = useState();

    const matrixId = {
        0: [0,0], 1: [0,1], 2: [0,2], 3: [0,3],
        4: [1,0], 5: [1,1], 6: [1,2], 7: [1,3],
        8: [2,0], 9: [2,1], 10: [2,2], 11: [2,3],
        12: [3,1], 13: [3,2], 14: [3,3], 15: [3,4]
    }

    const handleClick = idx => {
        setError();
        setLetterChosen(prevLetters => {
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
        if(letterChosen.length < 3) return setError('Word must be at least 3 letters long!');

        setWordList(prevWords => {
            const newWord = [];
            
            letterChosen.forEach(letter => {
                for(let key in matrixId){
                    if(matrixId[key].join(',') === letter){
                        newWord.push(letterArray[key])
                    }
                }
            });

            return [...prevWords, newWord.join('').toLowerCase()]
        })
        setLetterChosen([]);
    }

    const sendWordList = () => {
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
                    margin={error ? '-10px 0' : '10px 10px 40px'}
                    onClick={handleWordSubmit}
                    >
                        Submit Word!
                    </Button>

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
                                bgColor={letterChosen.includes(matrixId[idx].join(',')) ? '#00509c' : '#fcfcfa'}
                                fontColor={letterChosen.includes(matrixId[idx].join(',')) ? '#fcfcfa' : '#00509c'}
                                fontS='50px'
                                fontW='bold'
                                >
                                    {`${letter} ${firstLetter === idx ? 'asdf' : ''}`}
                                </Button>
                        ))}
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

export default Tray;