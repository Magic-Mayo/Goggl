import React, { useState, useContext, useEffect } from 'react';
import { Wrapper, Button } from '../styledComponents';
import {SocketContext} from '../../utils/Context';
import Loading from '../Loading';

const Tray = () => {
    const {socket, loading, players, scores, updatedScores, setUpdatedScores, setScores} = useContext(SocketContext);
    const [letterArray, setLetterArray] = useState(['A','F','A','E','T','G','L','O','M','N','A','B','W','I','J','L'])
    const [chosenLetters, setChosenLetters] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [firstLetter, setFirstLetter] = useState();

    const handleClick = ind => {
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

    const handleWordSubmit = e => {
        e.preventDefault();
        setWordList(prevWords => {
            const newWord = []
            chosenLetters.forEach(letter => newWord.push(letterArray[letter]));

            return [...prevWords, newWord.join('')]
        })
        setChosenLetters([]);
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
        >

            {loading ?
                <Loading />
            :
                <>
                    <Button
                    w='275px'
                    h='75px'
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
                </>
            }
        </Wrapper>
    )
}

export default Tray;