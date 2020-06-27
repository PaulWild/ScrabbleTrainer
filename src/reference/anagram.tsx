import React from 'react'
import { makeStyles, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from '../components/Word';
import { ScrabbleLetter } from '../components/Tile';
import { useSettings } from '../contextProviders/SettingsProvider';
import Configuration from '../configuration';
import ScrabbleCard from '../components/scrabbleCard';
import LoadingBackdrop from '../components/loadingBackdrop';

const useStyles = makeStyles((theme) => ({
    word: {
      marginTop: '0.5em'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
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

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      setLoading("LOADING")

      //naughty
      fetch(`${Configuration.ApiHost}/api/anagram?word=${value}&dict=${dictionaryType}`)
        .then(x => x.json())
        .then(x => setResults(x))
        .finally(() => setLoading("LOADED"))
    }

    const title = "Anagrams";
    const subHeader = "Search for anagrams. Use _ for blank tiles. ";
    const avatar = <ImportContactsIcon />
    const content = <>
    <FormControl component="form" onSubmit={onFormSubmit}>
        <InputLabel htmlFor="input-anagram" error= {noResults()}>{ noResults() ? "No Results" : "Letters"}</InputLabel>
        <Input
        error= {noResults()}
        id="input-anagram"
        onChange={handleChange}
        value={value}
        endAdornment={
            <InputAdornment  position="end"  className="Clickable">
            <IconButton aria-label="settings" onClick={onFormSubmit}>
            <ArrowForwardIcon color="secondary"/>
            </IconButton>
            </InputAdornment>
        }
        />
    </FormControl>
    {results.map((l, idx) => 
      <div className={classes.word}>
        <Word key={idx} letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' size={results[0].length > 8 ? 'Smallest': 'Small'}/>
      </div>)} </>      

    return (
    <>
      <LoadingBackdrop loading = {loading === "LOADING"} />  
      <ScrabbleCard title={title} subheader={subHeader} avatar={avatar} content={content} />  
    </>)
}