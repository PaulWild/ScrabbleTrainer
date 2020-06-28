import React from 'react'
import { Container, makeStyles, IconButton } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import { Routes } from '../App';
import ScrabbleCard from '../components/scrabbleCard';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(15em, 1fr));",
      }
    })
)

const Rereference = () => {
    const classes = useStyles();
    const history = useHistory();

    return( 
        <Container className={classes.root}>
            <ScrabbleCard title={"Anagrams"}
            subheader={"Search for anagrams. "}
            avatar = {<ImportContactsIcon />}
            action = {
                <IconButton aria-label="settings"  onClick={() => history.push(Routes.Anagram)}>
                <ArrowForwardIcon />
                </IconButton>
            }/>
            <ScrabbleCard             title={"Word Check"}
            subheader={"Check legality of multiple words"}
            action = {
                <IconButton aria-label="settings" onClick={() => history.push(Routes.WordCheck)}>
                <ArrowForwardIcon />
                </IconButton>           
            }
            avatar = {<ImportContactsIcon />}/>
            <ScrabbleCard             title={"Word Lists"}
            subheader={"Useful word lists"}
            action = {
                <IconButton aria-label="settings" onClick={() => history.push(Routes.Reference)}>
                <ArrowForwardIcon />
                </IconButton>
            }
            avatar = {<ImportContactsIcon />}/>

        </Container>
    )
}

export default Rereference