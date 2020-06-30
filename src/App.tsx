import React from 'react';
import WordBoard from './training/WordBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import  { ScrabbleLetter } from './components/Tile';
import Header from './components/Header';
import { ThemeProvider, makeStyles, Theme, createStyles, Toolbar } from '@material-ui/core';
import theme from "./theme"
import {SideDrawer} from './components/drawer';
import { Home } from './Home';
import { SettingsProvider } from './contextProviders/SettingsProvider';
import Settings from './settings/Settings';
import { Training } from './training/Training';
import { Anagram } from './reference/anagram';
import { NavControlProvder } from './navbar/navbar';
import { WordCheck } from './reference/wordCheck';
import Rereference from './reference/Reference';
import { WordList } from './reference/wordLists';
import { Stems } from './training/Stems/Stem';
import StemList from './training/Stems/StemList';

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

class RoutePaths  {
  Settings = "/Settings";
  Training = "/Training";
  Reference = "/Reference";
  Anagram = `${this.Reference}/Anagram`;
  WordCheck = `${this.Reference}/WordCheck`;
  WordList = `${this.Reference}/WordList`;
  StemList = `${this.Training}/bingostems`;
  Stem = (word: string, letter: string) => `${this.StemList}/${word}/${letter}`;
  TwoLetterWords = (letter: ScrabbleLetter) => `${this.Training}/2LetterWords/${letter}`;
  ThreeLetterWords = (letter: ScrabbleLetter) => `${this.Training}/3LetterWords/${letter}`;

}
export const Routes = new RoutePaths()

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
                      <Switch> 
                        <Route path="/Training/2LetterWords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={2} {...props}></WordBoard>} />
                        <Route path="/Training/3LetterWords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={3} {...props}></WordBoard>} />  
                        <Route path="/Training/bingostems/:word([A-Z]{1,})/:letter([A-Z,_]{1})" render={(props) => <Stems {...props}></Stems>} />  
                        <Route path={Routes.Anagram} component={Anagram} /> 
                        <Route path={Routes.WordCheck} component={WordCheck} /> 
                        <Route path={Routes.WordList} component={WordList} /> 
                        <Route path={Routes.Reference} component={Rereference} /> 
                        <Route path={Routes.StemList} component={StemList} />
                        <Route path={Routes.Training} component={Training} />
                        <Route path={Routes.Settings} component={Settings} />
                        <Route path="/"  component={Home} />
                    </Switch>
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
