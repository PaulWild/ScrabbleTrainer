import React  from 'react'
import { Card, CardHeader, Avatar, CardContent, makeStyles, FormControl, InputLabel, Select, Backdrop, CircularProgress, MenuItem, TextField } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from './Word';
import { ScrabbleLetter } from './Tile';
import {  useWordList } from '../dictionaries/dictionaryProvider';


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
      width: '6em',
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



export const WordList = () => {
    const classes = useStyles();
    const [startsWith, setStartsWith] = React.useState<string>("_");
    const [numberOfLetters, setWordLength] = React.useState<number>(2);
    const validWords = useWordList(startsWith, numberOfLetters)

    const onNumberChange = (x: number) => {
      if (x === 2) {
        setStartsWith("_")
      } else if (startsWith === "_") {
        setStartsWith("A")
      }

      setWordLength(x)
    }

    const onLetterChange = (x: string) => {

      const letters = x.toUpperCase();
      if (/^[A-Z]{0,}$/.test(letters)) {
        setStartsWith(letters)
      } 
    }

    return (
    <>
    <Backdrop className={classes.backdrop} open={validWords.state === "Loading"}>
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
            title={"Word Lists"}
            subheader={""}
        />
        <CardContent>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Number Of Letters</InputLabel>
        <Select
          value={numberOfLetters}
          onChange={(event) => onNumberChange(event.target.value as number)}
        >
          {[...Array(4).keys()].map(x => 
            <MenuItem value={x+2} key={x}>{x + 2}</MenuItem>
          )}   
        </Select>
        </FormControl>
        { numberOfLetters > 2 &&
        <FormControl className={classes.formControl}>
        <TextField  label="Begins With" onChange={(event) => onLetterChange(event.target.value as string)} value={startsWith} />  
        </FormControl>
        }
        <div className="Board">
        {validWords.state === "Loaded" && [...validWords.result].sort().map((l, idx) => 
            <Word key={idx} letters={l.split('').map(x => x as ScrabbleLetter)} highlight={'none'} />
)}     
</div>
      </CardContent>
    </Card>
  </div>
  </>)
}