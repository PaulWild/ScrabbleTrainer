import React, { useReducer } from 'react'
import {  Avatar,  FormControl, InputLabel, Input, InputAdornment, Button, IconButton, makeStyles } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from './Word';
import { ScrabbleLetter } from './Tile';
import { useWordCheck } from '../dictionaries/dictionaryProvider';
import AddIcon from '@material-ui/icons/Add';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ScrabbleCard from './scrabbleCard';
import LoadingBackdrop from './loadingBackdrop';

const useStyles = makeStyles((theme) => ({
    resultFoo: {
      marginTop: '1em',
      display: 'flex',
      flexFlow: 'row wrap',  
      justifyContent: 'center'
    },
    word: {
      marginTop: '0.5em'
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
      margin: theme.spacing(1),
      minWidth: 120,
    }
  }));

  
interface State {
  value: string,
  values: string[],
  checkedValues: string[],
}

type Actions = {action: "SetValue", value: string} | { action: "UpdateValues" } | { action: "UpdateValueList"}

const reducer = (state: State, action: Actions): State => {
  switch (action.action) {
    case 'SetValue':
      return {
        ...state,
        value: action.value,
      }
    case 'UpdateValues':
      return {
        ...state,
        value: '',
        values: state.values.concat([state.value.toUpperCase()])
      }
    case 'UpdateValueList':
        return {
          ...state,
          checkedValues: state.values 
        }
    default:
      throw new Error();
  }
}

export const WordCheck = () => {
    const classes = useStyles();

    const [value, dispatch] = useReducer(reducer, {value: '', values: [], checkedValues: [] })
    const state = useWordCheck(value.checkedValues);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({action: "SetValue", value: event.target.value});
    };


    const onFormSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      dispatch({action: "UpdateValues"});
    }


    const onCheckWords = () => {
      dispatch({action: "UpdateValues"});
      dispatch({action: "UpdateValueList"});
    }

    const title = "Word Check";
    const subHeader = "Check legality of multiple words";
    const avatar = <ImportContactsIcon />;
    const content = <>
      <FormControl component="form" onSubmit={onFormSubmit}>
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
        <div>
        {value.values.map((l, idx) => 
          <div key={idx} className={classes.word}>
            <Word  letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' />
          </div>)} 
          </div>
            <div>
        {state.state === "Loaded" ? 
        <div className={classes.resultFoo}> 
            {state.result === true ? 
            <Avatar aria-label="resources" className={classes.correct} >
                <CheckIcon />
            </Avatar>
 :              <Avatar aria-label="resources" className={classes.incorrect}>
 <CloseIcon />
</Avatar>
}
        </div> 
        : <Button variant="outlined" color="primary" onClick={onCheckWords} startIcon={<DoneAllIcon />}>
              Check
            </Button>    
}
          </div>
          </>

    return (
    <>
      <LoadingBackdrop loading = {state.state === "Loading"} />  
      <ScrabbleCard title={title} subheader={subHeader} avatar={avatar} content={content} />
    </>)
}