import { ScrabbleLetter } from './Tile';
import React, { useEffect, useState } from 'react';
import Word from './Word';
import { Button, makeStyles, Fade, Card, CardHeader, Avatar,  CardContent } from '@material-ui/core';
import './WordBoard.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { RouteComponentProps } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDictionary, waitForDictionary } from '../dictionaries/dictionaryProvider';
import { allLetters } from '../App';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

interface WordBoardProps extends RouteComponentProps<IMatchParams> {
  numberOfLetters: number
}

interface IMatchParams {
  letter: ScrabbleLetter
}

interface UpdateWordAction {
  selected: "Selected" | "UnSelected"
  word: string
}

interface State {
  selected: Set<String>,
  showResults: boolean,
}

const numberMap: { [key: number]: string } = {
  2: "Two",
  3: "Three"
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '60em',
    margin: '2em'
  },
  controls: {
    display: 'flex',
    flexDirection: 'row-reverse',

  },
  words: {
    cursor: "pointer"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const WordBoard = (props: WordBoardProps) => {

  const firstLetter = props.match.params.letter.toUpperCase() as ScrabbleLetter; //regex doesn't seem to work
  const dictionary = useDictionary();

  let validWords: Set<String> = new Set<string>();
  if (dictionary.status === 'LOADED') {
    validWords = new Set(dictionary.words.filter(x => x.length === props.numberOfLetters).filter(x => x.startsWith(firstLetter)));
  }

  const [letters, setLetters] = useState<ScrabbleLetter[][]>([[firstLetter]])
  const [words, setWords] = useState<Set<String>>(new Set<String>())
  const [selectedWords, setSelectedWords] = useState<Set<String>>(new Set<String>())
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    let l = [[firstLetter]]
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

    l = shuffle(l).slice(0, 75).sort();
    const w = l.map(x => x.join(''));

    setLetters(l);
    setWords(new Set(w));
    setSelectedWords(new Set());
    setShowResults(false);
    
  }, [firstLetter, props])

  const numberCorrect = () => [...selectedWords].filter(x => validWords.has(x)).length
  const numberIncorrect = () => [...selectedWords].filter(x => !validWords.has(x)).length
  const totelCorrectWords = () => [...words].filter(x => validWords.has(x)).length
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

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="training" className={classes.words}>
            <FitnessCenterIcon />
          </Avatar>
        }
        title={`${numberMap[props.numberOfLetters]} letter words`}
        subheader={wording()}
      />
      <CardContent>
        <div className="Board">
          {letters.map((l, idx) => 
          <div onClick={() => selectedWordsCallBack(l.join(''))} className={classes.words}>
            <Word key={idx} letters={l} highlight={selectedWords.has(l.join('')) ? 'selected' : 'none'} />
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
      </CardContent>
    </Card>)
}

export default waitForDictionary(WordBoard)