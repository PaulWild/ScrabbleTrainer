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
import { SettingsProvider } from './settings/SettingsProvider';
import Settings from './settings/Settings';
import { Training } from './Training';
import { Anagram } from './components/anagram';
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

interface IRoutes {
  Settings: string,
  Training: string,
  Resources: string,
  Anagram: () => string,
  TwoLetterWords: (letter: ScrabbleLetter) => string, 
  ThreeLetterWords: (letter: ScrabbleLetter) => string,
}
export const Routes: IRoutes = {
  Settings: "/Settings",
  Training: "/Training",
  Resources: "/Resources",
  Anagram: () => `${Routes.Resources}/Anagram`,
  TwoLetterWords: (letter: ScrabbleLetter) => `${Routes.Training}/2LetterWords/${letter}`,  
  ThreeLetterWords: (letter: ScrabbleLetter) => `${Routes.Training}/3LetterWords/${letter}`
}


function App() {
  const classes = useStyles();

  return (
    <>
    <Router>
      <SettingsProvider>
        <ThemeProvider theme={theme}>
          <NavControlProvder>
            <div className={classes.root}>
            <Header />
            <SideDrawer />
              <main className={classes.content}>
                <Toolbar />
                <DictionaryProvider>          
                      <Switch> 
                        <Route path="/Training/2LetterWords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={2} {...props}></WordBoard>} />
                        <Route path="/Training/3LetterWords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={3} {...props}></WordBoard>} />  
                        <Route path={Routes.Anagram()} component={Anagram} /> 
                        <Route path={Routes.Training} component={Training} />
                        <Route path={Routes.Settings} component={Settings} />
                        <Route path="/"  component={Home} />
                    </Switch>
                </DictionaryProvider>
            </main>  
            </div>
          </NavControlProvder>
        </ThemeProvider>
      </SettingsProvider>
    </Router>
    </>
  );
}

export default App;
