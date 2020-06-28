import React from 'react'
import { Container, makeStyles, IconButton } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../App';
import ScrabbleCard from '../../components/scrabbleCard';
import Word from '../../components/Word';
import { ScrabbleLetter } from '../../components/Tile';
import LetterGrid from '../../components/letterGrid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(15em, 30em));",
      }
    })
)

const stems = [
    "RETINA",
    "SATIRE",
    "BREAST",
    "MASTER",
    "DINETS",
    "STORED"
]

const StemList = () => {
    const classes = useStyles();
    const history = useHistory();

    const titleContent = (word: string) => <Word  letters={word.toUpperCase().split('').map(x => x as ScrabbleLetter)} highlight={'none'} size="Small"/>
    return( 
        <Container className={classes.root}>
            {stems.map((stem, idx) => 
            <ScrabbleCard key={idx} title = {titleContent(stem) as any}
            content =  {<LetterGrid onClick={(l) => () => history.push(Routes.Stem(stem + (l as string)))} size="Small" includeBlank={true}/>}
            avatar = {<ImportContactsIcon />}
            disableTypography = { true }
            action = {
                <IconButton aria-label="settings"  onClick={() => history.push(Routes.Stem(stem + ('_')))}>
                <ArrowForwardIcon />
                </IconButton>
            }/>)
            }
        </Container>
    )
}

export default StemList