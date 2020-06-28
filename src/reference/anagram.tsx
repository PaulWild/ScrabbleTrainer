import React from 'react'
import { makeStyles, FormControl, InputLabel, Input, InputAdornment, IconButton } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Word from '../components/Word';
import { ScrabbleLetter } from '../components/Tile';
import ScrabbleCard from '../components/scrabbleCard';
import LoadingBackdrop from '../components/loadingBackdrop';
import { useAnagramProvider } from '../contextProviders/dictionaryProvider';

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
    const [anagrams, searchAnagram] = useAnagramProvider();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    const noResults = () => anagrams.state === "Loaded" && anagrams.state.length === 0

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      searchAnagram(value);
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
    {anagrams.state === "Loaded" && anagrams.result.map((l, idx) => 
      <div className={classes.word}>
        <Word key={idx} letters={l.split('').map(x => x as ScrabbleLetter)} highlight='none' size={anagrams.result[0].length > 8 ? 'Smallest': 'Small'}/>
      </div>)} </>      

    return (
    <>
      <LoadingBackdrop loading = {anagrams.state === "Loading"} child={ <ScrabbleCard  title={title} subheader={subHeader} avatar={avatar} content={content} /> } />
    </>)
}