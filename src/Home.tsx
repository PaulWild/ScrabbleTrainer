import React from 'react'
import { Theme, Container, makeStyles, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SettingsIcon from '@material-ui/icons/Settings';

const backgroundImage ="/images/Hero.jpg"

const styles = makeStyles((theme: Theme) => ({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -2,
    },
    title: {
        color: theme.palette.common.white,
        fontSize: '5em',
        textAlign: 'center',
        fontFamily: "'Caveat', cursive",
      },
    root: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
          height: '70vh',
          minHeight: 500,
          maxHeight: 1300,
        },
      },
      container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: 'flex',
        alignItems: 'center',
        maxWidth: '300px',
        height: '350px',
        marginBlockEnd: '0'
      },
      slpashContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        alignItems: 'center',
        textAlign: 'center'
      },
      croot: {
        minWidth: 275,
        height: '310px',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',       
      },
      pos: {
        marginBottom: 12,
      },
      cSection: {
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: '900px',
          margin: '0 auto'
      },
      icon: {
        position: 'relative',
        left: '0.05em'
      },
      iconBorder: {
        fontSize: '4em',
        color: theme.palette.text.secondary,
        border: 'solid',
        display: 'flex',
        position: 'relative',
        borderRadius: '100%',
        width: '1.1em',
        borderWidth: 'thick',
        alignSelf: 'center'
      },
      cardHeader: {
        display: 'flex',
        flexFlow: 'column wrap',
        textAlign: 'center'
      },
      book: {
        bottom: '0.05em'
      }
    
  }));

export const Home = () => {

    const classes = styles();

    return (
        <>
        <section className={classes.root}>
        <Container className={classes.slpashContainer}>
            <div className={classes.background} />
            <Typography variant="h1" component="h1"  className={classes.title}>Scrabble Trainer</Typography> 
            <Typography variant="h6" component="h6"  color='primary'>Tools and references to supercharge your scrabble game</Typography> 
        </Container>
        </section>
        <section className={classes.cSection}>
        <Container className={classes.container}>
        <Card className={classes.croot}>  
    <CardContent>
      <div className={classes.cardHeader}>
        <div className={classes.iconBorder}><FitnessCenterIcon fontSize="inherit" className={classes.icon} /></div>
        <Typography variant="h2" component="h2"  color="textSecondary" gutterBottom>
          Training
        </Typography>
        </div>
        <Typography variant="body2" component="p">
          Exercises to become a better scrabble player, from 2 & 3 letter words to bingo stems.
          <br />
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to training</Button>
      </CardActions>
    </Card>
    </Container>
    <Container className={classes.container}>
        <Card className={classes.croot}>  
    <CardContent>
      <div className={classes.cardHeader}>
        <div className={classes.iconBorder}><ImportContactsIcon fontSize="inherit" className={`${classes.icon} ${classes.book}`} /></div>
        <Typography variant="h2" component="h2"  color="textSecondary" gutterBottom>
          Reference
        </Typography>
        </div>
        <Typography variant="body2" component="p">
          Handy references including multiple word lists, spell checker and anagram generator. 
          <br />
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to Reference</Button>
      </CardActions>
    </Card>
    </Container>
    
    <Container className={classes.container}>
        <Card className={classes.croot}>  
    <CardContent>
      <div className={classes.cardHeader}>
        <div className={classes.iconBorder}><SettingsIcon fontSize="inherit" className={classes.icon} /></div>
        <Typography variant="h2" component="h2"  color="textSecondary" gutterBottom>
          Settings
        </Typography>
        </div>
        <Typography variant="body2" component="p">
          Change site dictionary.
          <br />
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to Settings</Button>
      </CardActions>
    </Card>
    </Container>
    </section>
</>
    );
  }
  