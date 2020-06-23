import "./Dictionary.css"
import { useSettings } from '../settings/SettingsProvider';
import { useState, useEffect } from "react";
import Configuration from "../configuration";


type AsyncLoad<T> =  { state: "Init"} | { state: "Loading"} | { state: "Loaded", result: T} | { state: "Error" }

export type WordListState = AsyncLoad<Set<String>>

type WordCheckState = AsyncLoad<boolean>

const Dictionary = (type:string) => {
    return async (firstletter: string, length:number): Promise<string[]>  => {
        const x = await fetch(`${Configuration.ApiHost}/api/wordlists?startsWith=${firstletter}&length=${length}&dict=${type}`)
        return await x.json();
    }
}

export const useWordList = (startsWith: string, length: number) => {
  const [type,] = useSettings();
  const [state, updateState] = useState<WordListState>({state: "Init"});

  useEffect(() => {

    if (startsWith.length>0) {
      updateState({state: "Loading"})
      Dictionary(type)(startsWith,length)
      .then(x => updateState({state: "Loaded", result: new Set(x)}))
      .catch(() => updateState({state: "Error"}))
    }
  
  }, [startsWith, length, type])
  
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
    fetch(`${Configuration.ApiHost}/api/wordcheck?dict=${type}&word=${wordQuery}`)
      .then(x => x.text())
      .then(x => updateState({state: "Loaded", result: x === "True"}))
      .catch(() => updateState({state: "Error"}))  
  }

  
  return [state, checkWords]
}