import { useSettings } from './SettingsProvider';
import { useState, useEffect } from "react";
import Configuration from "../configuration";


type AsyncLoad<T> =  { state: "Init"} | { state: "Loading"} | { state: "Loaded", result: T} | { state: "Error" }

export type WordListState = AsyncLoad<Set<string>>

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

export const useAnagramProvider = (): [AsyncLoad<string[]>, (x: string) => void] => {
  const [type,] = useSettings();
  const [value, toSearch] = useState("");
  const [state, updateState] = useState<AsyncLoad<string[]>>({state: "Init"});

  useEffect(() => {

    if (value && value.length> 0) {
      updateState({state: "Loading"})
      fetch(`${Configuration.ApiHost}/api/anagram?word=${value}&dict=${type}`)
      .then(x => x.json())
      .then(x => updateState({state: "Loaded", result: x}))
      .catch(() => updateState({state: "Error"}))
    }
  
  }, [value, type])
  
  return [state, toSearch]
}

export const useWordCheck = (words: string[]): AsyncLoad<Boolean> => {
  const [type,] = useSettings();
  const [state, updateState] = useState<WordCheckState>({state: "Init"});

  useEffect(() => {

    if (!words || words.length === 0) {
      updateState({state: "Init"});
      return;
    }

    updateState({state: "Loading"})
    const wordQuery = words.join('&word=');
    fetch(`${Configuration.ApiHost}/api/wordcheck?dict=${type}&word=${wordQuery}`)
      .then(x => x.text())
      .then(x => updateState({state: "Loaded", result: x === "True"}))
      .catch(() => updateState({state: "Error"}))  
  },[words, type]);

  
  return state
}