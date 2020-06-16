import React from 'react';
import './App.css';
import WordBoard from './components/WordBoard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tile from './components/Tile';
import Header from './components/Header';

const Main = () => {
  return (
    <div className="AllLetters"> 
    <Link to="/a"><Tile letter="A" selected={false}/></Link>
    <Link to="/b"><Tile letter="B" selected={false}/></Link> 
    <Link to="/c"><Tile letter="C" selected={false}/></Link>
    <Link to="/d"><Tile letter="D" selected={false}/></Link> 
    <Link to="/e"><Tile letter="E" selected={false}/></Link>
    <Link to="/f"><Tile letter="F" selected={false}/></Link> 
    <Link to="/g"><Tile letter="G" selected={false}/></Link>
    <Link to="/h"><Tile letter="H" selected={false}/></Link> 
    <Link to="/i"><Tile letter="I" selected={false}/></Link>
    <Link to="/j"><Tile letter="J" selected={false}/></Link> 
    <Link to="/k"><Tile letter="K" selected={false}/></Link>
    <Link to="/l"><Tile letter="L" selected={false}/></Link> 
    <Link to="/m"><Tile letter="M" selected={false}/></Link>
    <Link to="/n"><Tile letter="N" selected={false}/></Link> 
    <Link to="/o"><Tile letter="O" selected={false}/></Link>
    <Link to="/p"><Tile letter="P" selected={false}/></Link> 
    <Link to="/q"><Tile letter="Q" selected={false}/></Link>
    <Link to="/r"><Tile letter="R" selected={false}/></Link> 
    <Link to="/s"><Tile letter="S" selected={false}/></Link>
    <Link to="/t"><Tile letter="T" selected={false}/></Link> 
    <Link to="/u"><Tile letter="U" selected={false}/></Link>
    <Link to="/v"><Tile letter="V" selected={false}/></Link> 
    <Link to="/w"><Tile letter="W" selected={false}/></Link> 
    <Link to="/x"><Tile letter="X" selected={false}/></Link>
    <Link to="/y"><Tile letter="Y" selected={false}/></Link> 
    <Link to="/z"><Tile letter="Z" selected={false}/></Link> 
  </div>)
}

function App() {
  return (
    <div className="App">
      <div className="nomnomContainer">
        <Router>
          <Header />
            <Switch>
            <Route path="/a">
              <WordBoard firstLetter="A" validWords={new Set(["AA", "AB", "AD", "AE", "AG", "AH", "AI", "AL", "AM", "AN", "AR", "AS", "AT", "AW", "AX", "AY" ])}></WordBoard>
            </Route>
            <Route path="/b">
              <WordBoard firstLetter="B" validWords={new Set(["BA", "BE", "BI", "BO", "BY" ])}></WordBoard>
            </Route>
            <Route path="/c">
              <WordBoard firstLetter="C" validWords={new Set(["CH" ])}></WordBoard>
            </Route>
            <Route path="/d">
              <WordBoard firstLetter="D" validWords={new Set(["DA", "DE", "DI", "DO" ])}></WordBoard>
            </Route>
            <Route path="/e">
              <WordBoard firstLetter="E" validWords={new Set(["EA", "ED", "EE", "EF", "EH", "EL", "EM", "EN", "ER", "ES", "ET", "EX" ])}></WordBoard>
            </Route>
            <Route path="/f">
              <WordBoard firstLetter="F" validWords={new Set(["FA", "FE", "FY" ])}></WordBoard>
            </Route>
            <Route path="/g">
              <WordBoard firstLetter="G" validWords={new Set(["GI", "GO", "GU" ])}></WordBoard>
            </Route>
            <Route path="/h">
              <WordBoard firstLetter="H" validWords={new Set(["HA", "HE", "HI", "HM", "HO" ])}></WordBoard>
            </Route>
            <Route path="/i">
              <WordBoard firstLetter="I" validWords={new Set(["ID", "IF", "IN", "IO", "IS", "IT" ])}></WordBoard>
            </Route>
            <Route path="/j">
              <WordBoard firstLetter="J" validWords={new Set(["JA", "JO" ])}></WordBoard>
            </Route>
            <Route path="/k">
              <WordBoard firstLetter="K" validWords={new Set(["KA", "KI", "KO", "KY" ])}></WordBoard>
            </Route>
            <Route path="/l">
              <WordBoard firstLetter="L" validWords={new Set(["LA", "LI", "LO" ])}></WordBoard>
            </Route>
            <Route path="/m">
              <WordBoard firstLetter="M" validWords={new Set(["MA", "ME", "MI", "MO", "MU", "MY" ])}></WordBoard>
            </Route>
            <Route path="/n">
              <WordBoard firstLetter="N" validWords={new Set(["NA", "NE", "NO", "NU", "NY" ])}></WordBoard>
            </Route>
            <Route path="/o">
              <WordBoard firstLetter="O" validWords={new Set(["OB","OD", "OE", "OF", "OH", "OI", "OM", "ON", "OO", "OP", "OS", "OU", "OW", "OX", "OY" ])}></WordBoard>
            </Route>
            <Route path="/p">
              <WordBoard firstLetter="P" validWords={new Set(["PA", "PE", "PI", "PO"  ])}></WordBoard>
            </Route>
            <Route path="/q">
              <WordBoard firstLetter="Q" validWords={new Set(["QI" ])}></WordBoard>
            </Route>
            <Route path="/r">
              <WordBoard firstLetter="R" validWords={new Set(["RE" ])}></WordBoard>
            </Route>
            <Route path="/s">
              <WordBoard firstLetter="S" validWords={new Set(["SH", "SI", "SO", "ST" ])}></WordBoard>
            </Route>
            <Route path="/t">
              <WordBoard firstLetter="T" validWords={new Set(["TA", "TE", "TI", "TO" ])}></WordBoard>
            </Route>
            <Route path="/u">
              <WordBoard firstLetter="U" validWords={new Set(["UG", "UH", "UM", "UN", "UP", "UR", "US", "UT" ])}></WordBoard>
            </Route>
            <Route path="/v">
              <WordBoard firstLetter="V" validWords={new Set()}></WordBoard>
            </Route>
            <Route path="/w">
              <WordBoard firstLetter="W" validWords={new Set(["WE", "WO" ])}></WordBoard>
            </Route>
            <Route path="/x">
              <WordBoard firstLetter="X" validWords={new Set(["XI", "XU" ])}></WordBoard>
            </Route>
            <Route path="/y">
              <WordBoard firstLetter="Y" validWords={new Set(["YA", "YE", "YO", "YU" ])}></WordBoard>
            </Route>
            <Route path="/z">
              <WordBoard firstLetter="Z" validWords={new Set(["ZO", "ZA" ])}></WordBoard>
            </Route>
            <Route path="/">
              <Main></Main>
            </Route>
          </Switch>
        </Router>
        </div>
    </div>
  );
}

export default App;
