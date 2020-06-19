import React from 'react';
import './App.css';
import WordBoard from './components/WordBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import  { ScrabbleLetter } from './components/Tile';
import Header from './components/Header';
import { DictionaryProvider, NavControlProvder } from './dictionaries/dictionaryProvider';
import { ThemeProvider, makeStyles, Theme, createStyles, Toolbar } from '@material-ui/core';
import theme from "./Theme/theme"
import {SideDrawer} from './components/drawer';
import { Home } from './Home';
export const allLetters: ScrabbleLetter[] = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1
    },
  })
)

function App() {
  const classes = useStyles();

  return (
    <>
    <Router>
    <ThemeProvider theme={theme}>
    <NavControlProvder>
      <div className={classes.root}>
      <Header />
      <SideDrawer />
        <main className={classes.content}>
          <Toolbar />
          <DictionaryProvider>          
                <Switch> 
                  <Route path="/2letterwords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={2} {...props}></WordBoard>} />
                  <Route path="/3letterwords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={3} {...props}></WordBoard>} />   
                  <Route path="/">

                    <Home></Home>
                  </Route>
              </Switch>
          </DictionaryProvider>
      </main>  
      </div>
    </NavControlProvder>
    </ThemeProvider>
    </Router>
    </>
  );
}

export default App;
