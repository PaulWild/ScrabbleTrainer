import { ScrabbleLetter } from './Tile';
import React, { useReducer } from 'react';
import Word from './Word';
import { Button, makeStyles, Fade } from '@material-ui/core';
import './WordBoard.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useDictionary, waitForDictionary } from '../dictionaries/dictionaryProvider';
import { allLetters } from '../App';


interface WordBoardProps extends RouteComponentProps<IMatchParams> {   
}

interface IMatchParams {
  letter: ScrabbleLetter
}

interface UpdateWordAction {
    selected: "Selected" | "UnSelected" 
    word: string
}

interface OtherAction {
  selected: "Reload" | "ShowResults"
}

interface State {
  selected:  Set<String>,
  showResults: boolean,
}

const reducer = (state: State, action: UpdateWordAction | OtherAction) => {
  switch (action.selected) {
      case "Selected": {
        return {
          ...state,
          selected: state.selected.add(action.word),
        }
      }
      case "UnSelected": {
        state.selected.delete(action.word);
        return {
          ...state
        }
      } 
      case "Reload": {
        return {
          ...state,
          selected: new Set<string>(),
          showResults: false
        }
      }
      case "ShowResults": {
        return {
          ...state,
          showResults: true
        } 
      }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: "0.3em",
    },
  },
}));

const WordBoard = (props: WordBoardProps) => {

    const firstLetter = props.match.params.letter.toUpperCase() as ScrabbleLetter; //regex doesn't seem to work
    const dictionary = useDictionary();
    
    let validWords: Set<String> = new Set<string>();
    if (dictionary.status === 'LOADED') {
      validWords = new Set(dictionary.words.filter(x => x.length === 2).filter(x => x.startsWith(firstLetter)));
    }
 

    const [state , dispatch] = useReducer(reducer, {selected: new Set<string>(), showResults: false})

    const numberCorrect = () => [...state.selected].filter(x => validWords.has(x)).length
    const numberIncorrect = () => [...state.selected].filter(x => !validWords.has(x)).length
    const totelCorrectWords = () => [...validWords].length
    const classes = useStyles();

    const selectedWordsCallBack = (isSelected: boolean, word: string) => {
        dispatch({selected: isSelected ? "Selected" : "UnSelected", word})
    } 

    return (
    <div className="Game">
      {!state.showResults &&
          <div className="Board">
            {allLetters.map((l, idx) => 
              <Word key={idx} letters={[firstLetter, l]} selectedCallback={ selectedWordsCallBack }></Word>
            )}      
          </div>
        }
        {!state.showResults 
          ? 
            <div className="Control" >
                <Link to="/">
                    <Button variant="outlined" color="secondary" startIcon={<ArrowBackIosIcon />}>Back</Button>
                </Link>
                <Button variant="outlined" color="primary" onClick={() => dispatch({selected: "ShowResults"})}  startIcon={<DoneAllIcon />}>
                    Check
                </Button>
            </div>
          :
          <div className={`Results ${classes.root}`}>      
          {(numberIncorrect() > 0 || numberCorrect() < totelCorrectWords()) &&    
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="info">
                  <AlertTitle>Correct Results</AlertTitle>
                    <strong>{numberCorrect()}</strong> out of <strong>{totelCorrectWords()}</strong> correct word{totelCorrectWords() === 1 ? "" :"s"}
                </Alert>
              </Fade> 
            }     
            {numberIncorrect() > 0 &&   
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="error">
                  <AlertTitle>Incorrect Results</AlertTitle>
                    <strong className={numberIncorrect() > 0 ? "Warn": ""}>{numberIncorrect()}</strong> incorrect word{numberIncorrect() === 1 ? "" :"s"}
                </Alert>
              </Fade> 
            }
            {(numberIncorrect() === 0 && numberCorrect() === totelCorrectWords()) &&    
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="success">
                  <AlertTitle>Correct Results</AlertTitle>
                    All <strong>{numberCorrect()}</strong>  word{numberCorrect() === 1 ? "" :"s"} found!
                </Alert>
              </Fade> 
}
              <Button variant="outlined" color="primary" onClick={() => dispatch({selected: "Reload"})}  startIcon={<DoneAllIcon />}>
                    Try Again
              </Button>
          </div>  
        }          
    </div>)
}

export default waitForDictionary(WordBoard)