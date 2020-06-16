import { ScrabbleLetter } from './Tile';
import React, { memo, useReducer } from 'react';
import Word from './Word';
import { Button, makeStyles, Collapse, Fade } from '@material-ui/core';
import './WordBoard.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

interface WordBoardProps {
    firstLetter: ScrabbleLetter,
    validWords: Set<String>
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
  valid: Set<String>,
  correct: number,
  incorrect: number,
  numberSelected: number,
  totalCorrectWords: number,
  showResults: boolean,
}

const reducer = (state: State, action: UpdateWordAction | OtherAction) => {
  switch (action.selected) {
      case "Selected": {
        return {
          ...state,
          selected: state.selected.add(action.word),
          numberSelected: [...state.selected].length,
          correct: [...state.selected].filter(x => state.valid.has(x)).length,
          incorrect: [...state.selected].filter(x => !state.valid.has(x)).length
        }
      }
      case "UnSelected": {
        state.selected.delete(action.word);
        return {
          ...state,
          numberSelected: [...state.selected].length,
          correct: [...state.selected].filter(x => state.valid.has(x)).length,
          incorrect: [...state.selected].filter(x => !state.valid.has(x)).length
        }
      } 
      case "Reload": {
        return {
          ...state,
          selected: new Set<string>(),
          valid: state.valid,
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

const WordBoard = ({firstLetter, validWords}: WordBoardProps) => {

    const classes = useStyles();
    const initState: State = {
      selected: new Set<String>(),
      valid: validWords,
      correct: 0,
      incorrect: 0,
      numberSelected: 0,
      totalCorrectWords: [...validWords].length,
      showResults: false
    }

    const [state , dispatch] = useReducer(reducer, initState)
    const selectedWordsCallBack = (isSelected: boolean, word: string) => {
        dispatch({selected: isSelected ? "Selected" : "UnSelected", word})
    } 


    return (
    <div className="Game">
      {!state.showResults &&
          <div className="Board">
                  <Word letters={[firstLetter, "A"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "B"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "C"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "D"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "E"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "F"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "G"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "H"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "I"]} selectedCallback={ selectedWordsCallBack }></Word>  
                  <Word letters={[firstLetter, "J"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "K"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "L"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "M"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "N"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "O"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "P"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "Q"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "R"]} selectedCallback={ selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "S"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "T"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "U"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "V"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "W"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "X"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "Y"]} selectedCallback= { selectedWordsCallBack }></Word>
                  <Word letters={[firstLetter, "Z"]} selectedCallback= { selectedWordsCallBack }></Word>
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
          {(state.incorrect > 0 || state.correct < state.totalCorrectWords) &&    
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="info">
                  <AlertTitle>Correct Results</AlertTitle>
                    <strong>{state.correct}</strong> out of <strong>{state.totalCorrectWords}</strong> correct word{state.totalCorrectWords === 1 ? "" :"s"}
                </Alert>
              </Fade> 
            }     
            {state.incorrect > 0 &&   
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="error">
                  <AlertTitle>Incorrect Results</AlertTitle>
                    <strong className={state.incorrect > 0 ? "Warn": ""}>{state.incorrect}</strong> incorrect word{state.incorrect === 1 ? "" :"s"}
                </Alert>
              </Fade> 
            }
            {(state.incorrect === 0 && state.correct === state.totalCorrectWords) &&    
              <Fade in={state.showResults}>
                <Alert variant="outlined" severity="success">
                  <AlertTitle>Correct Results</AlertTitle>
                    All <strong>{state.correct}</strong>  word{state.correct === 1 ? "" :"s"} found!
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

export default WordBoard