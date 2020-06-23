import React from 'react'
import { Container, Card, CardHeader, Avatar, CardContent, makeStyles, IconButton } from '@material-ui/core'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from 'react-router-dom';
import { Routes } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(30em, 1fr));",
        margin: "1em",
      },
    card: {
        minWidth: '20em',      
        margin: '2em',
        flex: '1 1 0px'
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
    },  
    })
)

const Rereference = () => {
    const classes = useStyles();
    const history = useHistory();

    return( 
        <Container className={classes.root}>
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <ImportContactsIcon />
            </Avatar>
            }
            title={"Anagrams"}
            subheader={"Search for anagrams. "}
            action = {
                <IconButton aria-label="settings"  onClick={() => history.push(Routes.Anagram)}>
                <ArrowForwardIcon />
                </IconButton>
            }
        />
        <CardContent> 
        </CardContent>
        </Card>
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <ImportContactsIcon />
            </Avatar>
            }
            title={"Word Check"}
            subheader={"Check legality of multiple words"}
            action = {
                <IconButton aria-label="settings" onClick={() => history.push(Routes.WordCheck)}>
                <ArrowForwardIcon />
                </IconButton>
            }
        /> 
        <CardContent> 
     
        </CardContent>
        </Card>
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label="training" className={classes.avatar}>
                <ImportContactsIcon />
            </Avatar>
            }
            title={"Word Lists"}
            subheader={"Useful word lists"}
            action = {
                <IconButton aria-label="settings" onClick={() => history.push(Routes.Reference)}>
                <ArrowForwardIcon />
                </IconButton>
            }
        /> 
        <CardContent> 
     
        </CardContent>
        </Card>
        </Container>
    )
}

export default Rereference