import React from 'react'
import { Card, CardHeader, Avatar, CardContent, makeStyles, FormControl, InputLabel, Input, InputAdornment, Backdrop, CircularProgress, Button, IconButton } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from './Word';
import { ScrabbleLetter } from './Tile';
import { useWordCheck } from '../dictionaries/dictionaryProvider';
import AddIcon from '@material-ui/icons/Add';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    resultFoo: {
      marginTop: '1em',
      display: 'flex',
      flexFlow: 'row wrap',  
      justifyContent: 'center'
    },
    card: {
      maxWidth: '60em',
      margin: '2em'
    },
    word: {
      marginTop: '0.5em'
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
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
    cardHeader: {
        display: 'flex',
        flexFlow: 'column wrap',
        textAlign: 'center'
      },
      margin: {
        margin: theme.spacing(1),
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 100,
        color: '#fff',
      },
  }));

export const WordCheck = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [values, setValues] = React.useState<string[]>([])
    const [state, checkWords] = useWordCheck();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };


    const pushValueToList = () => {
      if (value) {
        const v = Array.from(values)
        v.push(value.toUpperCase())
        setValues(v);
        setValue('');
      }    
    }
    const onFormSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      pushValueToList()
    }

    const onCheckWords = () => {
      pushValueToList()
      checkWords(values)
    }


    return (
    <>
    <Backdrop className={classes.backdrop} open={state.state === "Loading"}>
        <CircularProgress color="inherit" />
    </Backdrop>
    <div className={classes.root}>,
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="resources" className={classes.avatar}>
                <ImportContactsIcon />
            </Avatar>
            }
            title={"Word Check"}
            subheader={"Check legality of multiple words"}
        />
        <CardContent>
        <FormControl component="form" className={classes.margin} onSubmit={onFormSubmit}>
            <InputLabel htmlFor="input-word-check" >Word</InputLabel>
            <Input        
            id="input-word"
            onChange={handleChange}
            value={value}
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
        {values.map((l, idx) => 
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
          
      </CardContent>
    </Card>
  </div>
  </>)
}