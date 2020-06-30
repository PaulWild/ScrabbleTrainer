import React, { useReducer, useEffect, useState } from 'react'
import {  FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, Fade, Tooltip } from '@material-ui/core'
import Word from '../../components/Word';
import { ScrabbleLetter } from '../../components/Tile';
import { useAnagramProvider } from '../../contextProviders/dictionaryProvider';
import AddIcon from '@material-ui/icons/Add';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ScrabbleCard from '../../components/scrabbleCard';
import LoadingBackdrop from '../../components/loadingBackdrop';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LetterPagination from '../../components/letterPagination';
import { Routes } from '../../App';

const useStyles = makeStyles((theme) => ({
    results: {
      marginTop: '1.5em',
      display: 'flex',
      flexFlow: 'column',  
      justifyContent: 'left'
    },
    word: {
      marginTop: '0.5em',
      justifyContent: 'left'
    },
    words: {
      justifyContent: 'left',
      display: 'flex',
      flexFlow: 'row wrap',     
      marginBottom: '1.5em'
    },
    correct: {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.common.white,      
    },
    incorrect: {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,      
  },
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    controls: {
      display: 'flex',
      flexFlow: 'row wrap',   
      justifyContent: 'flex-end'
    },
    button: {
      position: "fixed"
    }
  }));

  
interface State {
  value: string,
  values: string[],
  showResults: boolean
}

type Actions = {action: "SetValue", value: string} | { action: "UpdateValues" } | { action: "ShowResults"} | { action: "Reset"} 

const reducer = (state: State, action: Actions): State => {
  switch (action.action) {
    case 'Reset': 
      return {
        value: '',
        values: [],
        showResults: false
      } 
    case 'SetValue':
      return {
        ...state,
        value: action.value,
      }
    case 'UpdateValues':
      return {
        ...state,
        value: '',
        values: state.value === "" ? state.values : state.values.concat([state.value.toUpperCase()])
      }
    case 'ShowResults':
        return {
          ...state,
          showResults: !state.showResults
        }
    default:
      throw new Error();
  }
}

interface StemProps extends RouteComponentProps<IMatchParams> {

}

interface IMatchParams {
  word: string
  letter: string
}
export const Stems = (props: StemProps) => {
    const classes = useStyles();  
    const history = useHistory();
    
    const letter = props.match.params.letter.toUpperCase();
    const stem =  props.match.params.word.toUpperCase();
    const word = stem + letter;
    const [value, dispatch] = useReducer(reducer, {value: '', values: [], showResults: false })
    const [anagrams, searchAnagram] = useAnagramProvider();
    const [showWords, setShowWords] = useState(false);
  
    useEffect(() => {
        searchAnagram(word)
    }, [word, searchAnagram])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({action: "SetValue", value: event.target.value});
    };
    
    useEffect(() => {
      dispatch({action: "Reset"})
    
    }, [props])

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      dispatch({action: "UpdateValues"});
    }


    const onCheckWords = () => {
      dispatch({action: "UpdateValues"});
      dispatch({action: "ShowResults"});
    }

    const onClickInput = () => {
      if (value.showResults) {
        dispatch({action: "ShowResults"});     
      }
    }



    const numberCorrect = () => value.values.filter(x => (anagrams.state === "Loaded") ? anagrams.result.includes(x) : false).length
    const numberIncorrect = () => value.values.filter(x => (anagrams.state === "Loaded") ? !anagrams.result.includes(x) : false).length
    const totalCorrectWords =  ((anagrams.state === "Loaded") ? anagrams.result : []).length

    const wording = () => {
      if (totalCorrectWords === 1) {
        return (<>Find the {totalCorrectWords} anagram from {word}</>)
      }
      if (totalCorrectWords === 0) {
        return (<>There are no anagrams for {word}</>)
      }
      return <>Find {totalCorrectWords} anagrams for {word}</>
  
  
    }

    const title = "Bingo Stems";
    const subHeader = wording();
    const avatar = <FitnessCenterIcon />;
    const content = <>
    { showWords ? 
          <div className={classes.words}>
          {anagrams.state === "Loaded" && anagrams.result.map((l, idx) => 
            <div key={idx} className={classes.word}>
              <Word  letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' size="Small" />
            </div>)} 
            </div>            
    : <>  
    <Word  letters={word.toUpperCase().split('').map(x => x as ScrabbleLetter)} highlight={'none'} />
      <FormControl className = {classes.formControl} component="form" onSubmit={onFormSubmit} onClick={onClickInput}>
            <InputLabel htmlFor="input-word-check" >Word</InputLabel>
            <Input        
            id="input-word"
            onChange={handleChange}
            value={value.value}
            endAdornment={
                <InputAdornment  position="end" className="Clickable">
                    <IconButton aria-label="settings"  onClick={onFormSubmit}>
                <AddIcon color="secondary"/>
                </IconButton>
                </InputAdornment>
            }
            />
        </FormControl>
        <div className={classes.words}>
        {value.values.map((l, idx) => 
          <div key={idx} className={classes.word}>
            <Word  letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' size="Small" />
          </div>)} 
          </div>
          <div className={classes.controls} >          
            <IconButton className={classes.button}  onClick={() => onCheckWords()} >
            <DoneAllIcon />
          </IconButton>
        </div>
          <LetterPagination onClick={(l) => { history.push(Routes.Stem(stem, l))}} letter = {letter as ScrabbleLetter} includeSpace={true} />
       
          {value.showResults && 
        <div className={classes.results}>
          {(numberIncorrect() > 0 || numberCorrect() < totalCorrectWords) &&
            <Fade in={true}>
              <Alert variant="standard" severity="info">
                <AlertTitle><strong>{numberCorrect()}</strong> out of <strong>{totalCorrectWords}</strong> correct word{totalCorrectWords === 1 ? "" : "s"}</AlertTitle>            
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
          {(numberIncorrect() === 0 && numberCorrect() === totalCorrectWords) &&
            <Fade in={true}>
              <Alert variant="standard" severity="success">
                <AlertTitle> All <strong>{numberCorrect()}</strong>  word{numberCorrect() === 1 ? "" : "s"} found!</AlertTitle>
                   
                </Alert>
            </Fade>
          }

        </div>} </>
    }         
          </>


    const contents = () => {
      return totalCorrectWords > 0 ? content : <><LetterPagination onClick={(l) => { history.push(Routes.Stem(stem, l))}} letter = {letter as ScrabbleLetter} includeSpace={true} /></>
    }

    return (
    <>
      <LoadingBackdrop loading = {anagrams.state === "Loading"} child =
        { <ScrabbleCard 
            title={title} 
            subheader={subHeader} 
            avatar={avatar} 
            content={contents()}
            action = {
              <IconButton aria-label="settings"  onClick={() => setShowWords(!showWords)}>
              { showWords ? <Tooltip title="Train"><FitnessCenterIcon /></Tooltip> :  <Tooltip title="Show Anargrams"><ImportContactsIcon /></Tooltip> }
              </IconButton>
          }/> }
          /> 
    </>)
}