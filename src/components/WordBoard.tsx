import { ScrabbleLetter } from './Tile';
import React, { memo, useReducer } from 'react';
import Word from './Word';
import { Button, makeStyles, Modal } from '@material-ui/core';
import './WordBoard.css';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';

interface WordBoardProps {
    firstLetter: ScrabbleLetter,
    validWords: Set<String>
}

interface Action {
    selected: boolean
    word: string
}

const reducer = (state: Set<String>, action: Action) => {
    switch (action.selected) {
        case true: return  state.add(action.word);
        case false: {
            state.delete(action.word);
            return state;
        }     
    }
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: '30%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      left: '35%',
      top: '3em'
    },
  }));

const WordBoard = ({firstLetter, validWords}: WordBoardProps) => {
    const classes = useStyles();
    const [selectedWords , dispatch] = useReducer(reducer, new Set<String>())
    const selectedWordsCallBack = (selected: boolean, word: string) => {
        dispatch({selected, word})
    } 


    const calculateResults = () => {
        const correct = [...selectedWords].filter(x => validWords.has(x)).length;
        const incorrect = [...selectedWords].filter(x => !validWords.has(x)).length;

        return {
            correct,
            incorrect
        };
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const body = () => {
        const {correct, incorrect} = calculateResults();

        return (<div className={classes.paper}>
          <p>
            <b>{correct}</b> out of <b>{[...validWords].length}</b> valid word{[...validWords].length == 1 ? "" :"s"}
          </p>
          <p>
            <b className={incorrect > 0 ? "Warn": ""}>{incorrect}</b> incorrect word{incorrect == 1 ? "" :"s"}
          </p>
        </div>
        )};

    return (
    <div className="Game">
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
        <div className="Control" >
            <Link to="/">
                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIosIcon />}>Back</Button>
            </Link>
            <Button variant="outlined" color="primary" onClick={handleOpen}  startIcon={<DoneAllIcon />}>
                Check
            </Button>
        </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
    </div>)
}

export default memo(WordBoard)