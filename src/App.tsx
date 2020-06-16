import React from 'react';
import './App.css';
import WordBoard from './components/WordBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tile, { ScrabbleLetter } from './components/Tile';
import Header from './components/Header';
import { DictionaryProvider } from './dictionaries/dictionaryProvider';

export const allLetters: ScrabbleLetter[] = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const Main = () => {
  return (
    <div className="AllLetters"> 
    {allLetters.map((l, idx) => 
            <Link key={idx} to={`/${l}`}><Tile letter={l} selected={false}/></Link>
        )}
  </div>)
}

function App() {
  return (
    <div className="App">
      <div className="nomnomContainer">
        <DictionaryProvider>
          <Router>
            <Header />
              <Switch> 
                  <Route path="/:letter([A-Z]{1})" component={WordBoard} />
                <Route path="/">
                  <Main></Main>
                </Route>
            </Switch>
          </Router>
        </DictionaryProvider>
        </div>
    </div>
  );
}

export default App;
