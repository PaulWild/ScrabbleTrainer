import React  from 'react'
import { makeStyles, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from '../components/Word';
import { ScrabbleLetter } from '../components/Tile';
import {  useWordList } from '../contextProviders/dictionaryProvider';
import LoadingBackdrop from '../components/loadingBackdrop';
import ScrabbleCard from '../components/scrabbleCard';


const useStyles = makeStyles((theme) => ({
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
    board: {
      flexDirection: "row",
      flexWrap: "wrap",
      display: "flex",
      justifyContent: "left",
    }
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

    const title = "Word Lists"
    const subHeader = ""
    const avatar = <ImportContactsIcon />
    const content =   <> <FormControl className={classes.formControl}>
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
    <div className={classes.board}>
    {validWords.state === "Loaded" && [...validWords.result].sort().map((l, idx) => 
        <Word key={idx} letters={l.split('').map(x => x as ScrabbleLetter)} highlight={'none'} />
)}     
</div>
</>

    return (
      <>
        <LoadingBackdrop loading = {validWords.state === "Loading"} child = { <ScrabbleCard title={title} subheader={subHeader} avatar={avatar} content={content} /> } />
      </>)
}