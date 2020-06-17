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
    <div>
      <h2>2 Letter Words</h2>
      <div className="AllLetters">
            {allLetters.map((l, idx) => 
                    <Link key={idx} to={`/2letterwords/${l}`}><Tile letter={l} selected={false}/></Link>
                )}
      </div>
      <h2>3 Letter Words</h2> 
      <div className="AllLetters">
      {allLetters.map((l, idx) => 
              <Link key={idx} to={`/3letterwords/${l}`}><Tile letter={l} selected={false}/></Link>
          )}
    </div>
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
                <Route path="/2letterwords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={2} {...props}></WordBoard>} />
                <Route path="/3letterwords/:letter([A-Z]{1})" render={(props) => <WordBoard numberOfLetters={3} {...props}></WordBoard>} />
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
