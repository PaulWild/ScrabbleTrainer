import "./Dictionary.css"
import { useSettings } from '../settings/SettingsProvider';
import { ScrabbleLetter } from '../components/Tile';
import { useState, useEffect } from "react";

type WordListState = { state: "Loading"} | { state: "Loaded", words: Set<string>} | { state: "Error" }

const Dictionary = (type:string) => {
    return async (firstletter: ScrabbleLetter, length:number): Promise<string[]>  => {
        //fetch(`https://scrabble.paulwild.dev/api/wordlists?letter=${firstletter}&length=${length}&dict=${type}`)
        const x = await fetch(`http://localhost:7071/api/wordlists?letter=${firstletter}&length=${length}&dict=${type}`);
        return await x.json();
    }
}

export const useWordList = (firstLetter: ScrabbleLetter, length: number) => {
  const [type,] = useSettings();
  const [state, updateState] = useState<WordListState>({state: "Loading"});

  useEffect(() => {
    Dictionary(type)(firstLetter,length)
    .then(x => updateState({state: "Loaded", words: new Set(x)}))
    .catch(() => updateState({state: "Error"}))
  
  }, [firstLetter, length, type])
  
  return state
}