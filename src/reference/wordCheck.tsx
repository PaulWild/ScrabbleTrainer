import React, { useReducer } from 'react'
import { FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, Fade } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from '../components/Word';
import { ScrabbleLetter } from '../components/Tile';
import { useWordCheck } from '../contextProviders/dictionaryProvider';
import AddIcon from '@material-ui/icons/Add';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ScrabbleCard from '../components/scrabbleCard';
import LoadingBackdrop from '../components/loadingBackdrop';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  words: {
    justifyContent: 'left',
    display: 'flex',
    flexFlow: 'row wrap',     
    marginBottom: '1.5em'
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
    },
    button: {
      marginTop: "1em"
    },
    checkButton: {
      float: "right"
    }
  }));

  
interface State {
  value: string,
  values: string[],
  checkedValues: string[],
}

type Actions = {action: "SetValue", value: string} | { action: "UpdateValues" } | { action: "UpdateValueList"} | { action: "Reset"}

const initialState =
  {value: '', values: [], checkedValues: [] }


const reducer = (state: State, action: Actions): State => {
  switch (action.action) {
    case 'SetValue':
      return {
        ...state,
        value: action.value,
      }
    case 'Reset':
      return initialState
    case 'UpdateValues':
      return {
        ...state,
        value: '',
        values: state.value === "" ? state.values : state.values.concat([state.value.toUpperCase()])
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

    const [value, dispatch] = useReducer(reducer, initialState)
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

        {state.state === "Loaded" ? 
        <>
            {state.result === true ? 
  <Fade in={true}>
  <Alert variant="standard" severity="success">
    <AlertTitle>Correct</AlertTitle>
  </Alert>
 </Fade>
 :                        <Fade in={true}>
 <Alert variant="standard" severity="error">
   <AlertTitle>Incorrect</AlertTitle>
 </Alert>
</Fade>
}
        </> 
        : <>
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
    <div className={classes.words}>
    {value.values.map((l, idx) => 
      <div key={idx} className={classes.word}>
        <Word  letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' />
      </div>)} 
      </div>
        <div className= {classes.checkButton}>
        <IconButton className={classes.button}  onClick={onCheckWords} >
            <DoneAllIcon />
          </IconButton>          </div>
            </>
}
 
          </>

    return (
    <>
      <LoadingBackdrop loading = {state.state === "Loading"} child ={ <ScrabbleCard title={title} subheader={subHeader} avatar={avatar} content={content} action={<IconButton onClick={() => dispatch({action: "Reset"})}><RefreshIcon /></IconButton>} /> } />
    </>)
}