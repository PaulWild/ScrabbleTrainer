import "./Dictionary.css"
import { useSettings } from '../settings/SettingsProvider';
import { ScrabbleLetter } from '../components/Tile';
import { useState, useEffect } from "react";


type AsyncLoad<T> =  { state: "Init"} | { state: "Loading"} | { state: "Loaded", result: T} | { state: "Error" }

type WordListState = AsyncLoad<Set<String>>

type WordCheckState = AsyncLoad<boolean>

const Dictionary = (type:string) => {
    return async (firstletter: ScrabbleLetter, length:number): Promise<string[]>  => {
        const x = await fetch(`https://scrabble.paulwild.dev/api/wordlists?letter=${firstletter}&length=${length}&dict=${type}`)
        //const x = await fetch(`http://localhost:7071/api/wordlists?letter=${firstletter}&length=${length}&dict=${type}`);
        return await x.json();
    }
}

export const useWordList = (firstLetter: ScrabbleLetter, length: number) => {
  const [type,] = useSettings();
  const [state, updateState] = useState<WordListState>({state: "Loading"});

  useEffect(() => {
    Dictionary(type)(firstLetter,length)
    .then(x => updateState({state: "Loaded", result: new Set(x)}))
    .catch(() => updateState({state: "Error"}))
  
  }, [firstLetter, length, type])
  
  return state
}

export const useWordCheck = (): [AsyncLoad<Boolean>, (x: string[]) => void] => {
  const [type,] = useSettings();
  const [state, updateState] = useState<WordCheckState>({state: "Init"});

  const checkWords = (words: string[]) => {

    if (!words) {
      return {state: "Error"};
    }

    const wordQuery = words.join('&word=');
    //fetch(`http://localhost:7071/api/wordcheck?dict=${type}&word=${wordQuery}`)
    fetch(`https://scrabble.paulwild.dev/api/wordcheck?dict=${type}&word=${wordQuery}`)
      .then(x => x.text())
      .then(x => updateState({state: "Loaded", result: x === "True"}))
      .catch(() => updateState({state: "Error"}))  
  }

  
  return [state, checkWords]
}