import { ScrabbleLetter } from './Tile';
import React, { useEffect, useState } from 'react';
import Word from './Word';
import { Button, makeStyles, Fade } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useWordList } from '../dictionaries/dictionaryProvider';
import { allLetters } from '../App';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LoadingBackdrop from './loadingBackdrop';
import ScrabbleCard from './scrabbleCard';

interface WordBoardProps extends RouteComponentProps<IMatchParams> {
  numberOfLetters: number
}

interface IMatchParams {
  letter: ScrabbleLetter
}

const numberMap: { [key: number]: string } = {
  2: "Two",
  3: "Three"
}

const useStyles = makeStyles((theme) => ({
  controls: {
    display: 'flex',
    flexDirection: 'row-reverse',

  },
  words: {
    cursor: "pointer"
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "left",
  }
}));



const WordBoard = (props: WordBoardProps) => {

  const firstLetter = props.match.params.letter.toUpperCase(); //regex doesn't seem to work
  const [letters, setLetters] = useState<Set<string>>(new Set(firstLetter))
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set<string>())
  const [showResults, setShowResults] = useState<boolean>(false);
  const validWords = useWordList(firstLetter, props.numberOfLetters)

  useEffect(() => { 
  
    if (validWords.state === "Loaded") {
    let l = [[firstLetter as ScrabbleLetter]]
    for (let i = 1; i < props.numberOfLetters; i++) {
      l = l.flatMap(x => allLetters.map(y => [...x, y]))
    }

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    function shuffle<T>(a: T[]) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
  
    const tmp = [...validWords.result]
    const correct = shuffle(tmp).slice(0, 5).sort();

    l = shuffle(l).slice(0, 30).sort();
    const w = l.map(x => x.join(''));

    setLetters(new Set(w.concat(correct)));
    setSelectedWords(new Set());
    setShowResults(false);
  }
  }, [firstLetter, props.numberOfLetters, validWords])

  const numberCorrect = () => [...selectedWords].filter(x => (validWords.state === "Loaded") ? validWords.result.has(x) : false).length
  const numberIncorrect = () => [...selectedWords].filter(x => (validWords.state === "Loaded") ? !validWords.result.has(x) : false).length
  const totelCorrectWords = () => [...letters].filter(x => (validWords.state === "Loaded") ? validWords.result.has(x) : false).length
  const classes = useStyles();

  const wording = () => {
    const numberOfWords = totelCorrectWords();
    if (numberOfWords === 1) {
      return (<>Find the {totelCorrectWords()} word that begin with the letter {firstLetter}</>)
    }
    if (numberOfWords === 0) {
      return (<>There are no {props.numberOfLetters} letter {firstLetter} words!</>)
    }
    return <>Find {totelCorrectWords()} words that begin with the letter {firstLetter}</>


  }

  const selectedWordsCallBack = (word: string) => {
    if (showResults === true) {
      setShowResults(!showResults)
    }

    if (selectedWords.has(word)) {
      selectedWords.delete(word)
      setSelectedWords(new Set(selectedWords))
    }
    else {
      setSelectedWords(new Set(selectedWords.add(word)))
    }
  }
    

    const avatar = <FitnessCenterIcon />
    const title = `${numberMap[props.numberOfLetters]} letter words`
    const content = <>
       <div className= {classes.board}>
          {[...letters].sort().map((l, idx) => 
          <div key={idx} onClick={() => selectedWordsCallBack(l)} className={classes.words}>
            <Word  letters={l.split('').map(x => x as ScrabbleLetter)} highlight={selectedWords.has(l) ? 'selected' : 'none'} />
          </div>)}           
        </div>
        <div className={classes.controls} >
          {!showResults
            ?
            <Button variant="outlined" color="primary" onClick={() => setShowResults(true)} startIcon={<DoneAllIcon />}>
              Check
            </Button>
            :
            <Button variant="outlined" color="primary" onClick={() => setShowResults(false)} startIcon={<DoneAllIcon />}>
              Try Again
            </Button>

          }
        </div>
        {showResults && 
        <div className={`Results`}>
          {(numberIncorrect() > 0 || numberCorrect() < totelCorrectWords()) &&
            <Fade in={true}>
              <Alert variant="standard" severity="info">
                <AlertTitle><strong>{numberCorrect()}</strong> out of <strong>{totelCorrectWords()}</strong> correct word{totelCorrectWords() === 1 ? "" : "s"}</AlertTitle>            
              </Alert>
            </Fade>
          }
          {numberIncorrect() > 0 &&
            <Fade in={true}>
              <Alert variant="standard" severity="error">
                <AlertTitle><strong className={numberIncorrect() > 0 ? "Warn" : ""}>{numberIncorrect()}</strong> incorrect word{numberIncorrect() === 1 ? "" : "s"}</AlertTitle>
              </Alert>
            </Fade>
          }
          {(numberIncorrect() === 0 && numberCorrect() === totelCorrectWords()) &&
            <Fade in={true}>
              <Alert variant="standard" severity="success">
                <AlertTitle> All <strong>{numberCorrect()}</strong>  word{numberCorrect() === 1 ? "" : "s"} found!</AlertTitle>
                   
                </Alert>
            </Fade>
          }

        </div>
        }
        </>

  return (
    <>
    <LoadingBackdrop loading = {validWords.state === "Loading"} />  
    <ScrabbleCard title={title} subheader={wording()} avatar={avatar} content={content} />
    </>)
}

export default WordBoard