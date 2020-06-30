import { ScrabbleLetter } from '../components/Tile';
import React, { useEffect, useState } from 'react';
import Word from '../components/Word';
import { makeStyles, IconButton } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useWordList } from '../contextProviders/dictionaryProvider';
import { allLetters, Routes } from '../App';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import LoadingBackdrop from '../components/loadingBackdrop';
import ScrabbleCard from '../components/scrabbleCard';
import LetterPagination from '../components/letterPagination';
import Results from '../components/results';

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
    marginBottom: "1.5em"
  },
  button: {
    position: "fixed"
  }
}));



const WordBoard = (props: WordBoardProps) => {

  const history = useHistory();
  const firstLetter = props.match.params.letter.toUpperCase(); //regex doesn't seem to work
  const [letters, setLetters] = useState<Set<string>>(new Set(firstLetter))
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set<string>())
  const [showResults, setShowResults] = useState<boolean>(false);
  const validWords = useWordList(firstLetter, props.numberOfLetters)
  const paginationAction = props.numberOfLetters === 2  ? ((l: string) => history.push(Routes.TwoLetterWords(l as ScrabbleLetter))) : ((l: string) => history.push(Routes.ThreeLetterWords(l as ScrabbleLetter)))

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

  const numberCorrect = [...selectedWords].filter(x => (validWords.state === "Loaded") ? validWords.result.has(x) : false).length
  const numberIncorrect = [...selectedWords].filter(x => (validWords.state === "Loaded") ? !validWords.result.has(x) : false).length
  const totalCorrect =  [...letters].filter(x => (validWords.state === "Loaded") ? validWords.result.has(x) : false).length
  const classes = useStyles();

  const wording = () => {
    const numberOfWords = totalCorrect;
    if (numberOfWords === 1) {
      return (<>Find the word that begins with the letter {firstLetter}</>)
    }
    if (numberOfWords === 0) {
      return (<>There are no {props.numberOfLetters} letter {firstLetter} words!</>)
    }
    return <>Find {totalCorrect} words that begin with the letter {firstLetter}</>


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
        <IconButton className={classes.button}  onClick={() => setShowResults(!showResults)} >
            <DoneAllIcon />
          </IconButton>
         
        </div>
        <LetterPagination onClick={paginationAction} letter={firstLetter as ScrabbleLetter} includeSpace={true} />
        <Results showResults={showResults} numberCorrectAnswers={totalCorrect}  correct={numberCorrect} incorrect={numberIncorrect} />
        </>

  return (
    <LoadingBackdrop 
      loading = { validWords.state === "Loading" } 
      child = { <ScrabbleCard title={title} subheader={wording()} avatar={avatar} content={content} /> } 
    />)
}

export default WordBoard