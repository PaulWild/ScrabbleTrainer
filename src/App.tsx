import React, { ComponentType } from 'react';
import WordBoard from './training/WordBoard';
import {
  Router,
  Switch,
  Route,
  RouteProps
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
import { Auth0Provider, withAuthenticationRequired } from "@auth0/auth0-react";
import { createBrowserHistory } from 'history';

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
  Login = "/login"
  Stem = (word: string, letter: string) => `${this.StemList}/${word}/${letter}`;
  SmallWordsTraining = (letter: ScrabbleLetter, numberOfLetters: number) => `${this.Training}/${numberOfLetters}LetterWords/${letter}`;
}

interface loginProps {
  url: string
}

const onRedirectCallback = (appState: any) => {
  // Use the router's history module to replace the url
  console.table(appState)
  history.replace(appState?.returnTo || window.location.pathname);
};


export const Routes = new RoutePaths()

const ProtectedRoute = ({ component, ...args }: RouteProps) => {
  return <Route component={withAuthenticationRequired(component as ComponentType<any>)} {...args} />
};

export const history = createBrowserHistory();

function App() {
  const classes = useStyles();

  return (
    <>
    <Router history={history}>
      <Auth0Provider
      domain="dev-27tyxhab.eu.auth0.com"
      clientId="y2XbuFg12IbbEcroXB4NAUjO03EuXN4M"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
        <SettingsProvider>
          <ThemeProvider theme={theme}>
            <NavControlProvder>
              <div className={classes.root}>
              <Header />
              <SideDrawer />
                <main className={classes.content}>
                  <Toolbar />
                        <Switch> 

                          <Route path={Routes.Anagram} component={Anagram} /> 
                          <Route path={Routes.WordCheck} component={WordCheck} /> 
                          <Route path={Routes.WordList} component={WordList} /> 
                          <Route path={Routes.Reference} component={Rereference} /> 
                          <ProtectedRoute path="/Training/:numberOfLetters([1,2])LetterWords/:letter([A-Z]{1})"component={WordBoard} />
                          <ProtectedRoute path="/Training/bingostems/:word([A-Z]{1,})/:letter([A-Z,_]{1})" component={Stems} />  
                          <ProtectedRoute path={Routes.StemList} component={StemList} />
                          <ProtectedRoute path={Routes.Training} component={Training} />
                          <Route path={Routes.Settings} component={Settings} />
                          <Route path="/"  component={Home} />
                      </Switch>
              </main>  
              </div>
            </NavControlProvder>
          </ThemeProvider>
        </SettingsProvider>
      </Auth0Provider>
    </Router>
    </>
  );
}

export default App;
