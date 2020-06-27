import React from 'react'
import { makeStyles, Typography, Container } from '@material-ui/core'
import { allLetters, Routes } from './App';
import Tile from './components/Tile';
import { useHistory } from 'react-router-dom';
import ScrabbleCard from './components/scrabbleCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(30em, 1fr));",
    margin: "1em",
  },
  }))

export const Training = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
      <Container className={classes.root}>
      <ScrabbleCard title={"Two Letter Words"}
      subheader={"Test your knowledge of valid two letter words"}
      avatar = {<Typography variant='h4' component='h5' color='inherit'>2</Typography>}
      content = { 
        <div className="AllLetters">
        {allLetters.map((l, idx) =>
        <div onClick={() => history.push(Routes.TwoLetterWords(l))} key={idx}><Tile letter={l} selected={false} size="Medium" /></div>
        )}
        </div>
      }/>
            <ScrabbleCard title={"Three Letter Words"}
      subheader={"Test your knowledge of valid three letter words"}
      avatar = {<Typography variant='h4' component='h5' color='inherit'>3</Typography>}
      content = { 
        <div className="AllLetters">
        {allLetters.map((l, idx) =>
        <div onClick={() => history.push(Routes.ThreeLetterWords(l))} key={idx}><Tile letter={l} selected={false} size="Medium" /></div>
        )}
        </div>
      }/>
      </Container>
        )
   
}