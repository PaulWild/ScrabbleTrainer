import React from 'react'
import { Card, CardHeader, Avatar, CardContent, makeStyles, FormControl, InputLabel, Input, InputAdornment, Backdrop, CircularProgress } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from './Word';
import { ScrabbleLetter } from './Tile';
import { useSettings } from '../settings/SettingsProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
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

export const Anagram = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [loading, setLoading] = React.useState<"INIT"|"LOADING"|"LOADED">("INIT");
    const [results, setResults] = React.useState<string[]>([]);
    const [dictionaryType, ] = useSettings();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const noResults = () => loading === "LOADED" && results.length === 0

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setLoading("LOADING")

      //naughty
      fetch(`https://scrabble.paulwild.dev/api/anagram?word=${value}`)
        .then(x => x.json())
        .then(x => setResults(x))
        .finally(() => setLoading("LOADED"))
    }


    return (
    <>
    <Backdrop className={classes.backdrop} open={loading === "LOADING"}>
        <CircularProgress color="inherit" />
    </Backdrop>
    <div className={classes.root}>,
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <ImportContactsIcon />
            </Avatar>
            }
            title={"Anagrams"}
            subheader={"Search for anagrams. Use _ for blank tiles. "}
        />
        <CardContent>
        <FormControl component="form" className={classes.margin} onSubmit={onFormSubmit}>
            <InputLabel htmlFor="input-anagram" error= {noResults()}>{ noResults() ? "No Results" : "Letters"}</InputLabel>
            <Input
            error= {noResults()}
            id="input-anagram"
            onChange={handleChange}
            value={value}
            endAdornment={
                <InputAdornment  position="end">
                <ArrowForwardIcon color="secondary"/>
                </InputAdornment>
            }
            />
        </FormControl>
        {results.map((l, idx) => 
          <div className={classes.word}>
            <Word key={idx} letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' size={results[0].length > 8 ? 'Small': 'Medium'}/>
          </div>)}      
      </CardContent>
    </Card>
  </div>
  </>)
}