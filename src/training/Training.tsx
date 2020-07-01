import React from 'react'
import { makeStyles, Typography, Container, IconButton } from '@material-ui/core'
import {  Routes } from '../App';
import { useHistory } from 'react-router-dom';
import ScrabbleCard from '../components/scrabbleCard';
import LetterGrid from '../components/letterGrid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    flexWrap: "wrap",
    margin: 0
  },
  item: {
    flexBasis: "25em"
  }
  }))

export const Training = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
      <Container className={classes.root}>
      <ScrabbleCard className={classes.item} title={"Two Letter Words"}
      subheader={"Test your knowledge of valid two letter words"}
      avatar = {<Typography variant='h4' component='h5' color='inherit'>2</Typography>}
      content = {<LetterGrid onClick={(l) => () => history.push(Routes.SmallWordsTraining(l, 2))} />}/>
            <ScrabbleCard title={"Three Letter Words"} className={classes.item}
      subheader={"Test your knowledge of valid three letter words"}
      avatar = {<Typography variant='h4' component='h5' color='inherit'>3</Typography>}
    content = {<LetterGrid onClick={(l) => () => history.push(Routes.SmallWordsTraining(l, 3))} />}  />
      <ScrabbleCard className={classes.item} title={"Bingo Stems"}
      subheader={"Test your bingo stem skills"}
      avatar = {<Typography variant='h4' component='h5' color='inherit'>S</Typography>}
      action = { <IconButton aria-label="settings" onClick={() => history.push(Routes.StemList)}> 
      <ArrowForwardIcon />
      </IconButton> }
 />
      </Container>)
}