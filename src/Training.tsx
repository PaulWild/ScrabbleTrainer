import React from 'react'
import { Card, CardHeader, Avatar, CardContent, makeStyles, Typography } from '@material-ui/core'
import { allLetters, Routes } from './App';
import Tile from './components/Tile';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row wrap',
    },
    card: {
      maxWidth: '30em',
      margin: '2em'
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
  }));

export const Training = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
    
    <div className={classes.root}>,
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <Typography variant='h4' component='h5' color='inherit'>2</Typography>
            </Avatar>
            }
            title={"Two Letter Words"}
            subheader={"Test your knowledge of valid two letter words"}
        />
        <CardContent>
            <div className="AllLetters">
                {allLetters.map((l, idx) =>
                <div onClick={() => history.push(Routes.TwoLetterWords(l))} key={idx}><Tile letter={l} selected={false} size="Medium" /></div>
                )}
          </div>
        </CardContent>
        </Card>
        
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <Typography variant='h4' component='h5' color='inherit'>3</Typography>
            </Avatar>
            }
            title={"Three Letter Words"}
            subheader={"Test your knowledge of valid three letter words"}
        />
        <CardContent>
        <div className="AllLetters">
                {allLetters.map((l, idx) =>
                <div onClick={() => history.push(Routes.ThreeLetterWords(l))} key={idx}><Tile letter={l} selected={false} size="Medium" /></div>
                )}
          </div>
        </CardContent>
        </Card>
        </div>
        )
   
}