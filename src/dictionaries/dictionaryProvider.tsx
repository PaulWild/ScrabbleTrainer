import "./Dictionary.css"
import { useSettings } from '../settings/SettingsProvider';
import { ScrabbleLetter } from '../components/Tile';

const Dictionary = (type:string) => {
    return { 
      words: async (firstletter: ScrabbleLetter, length:number): Promise<string[]>  => {
        const x = await fetch(`https://scrabble.paulwild.dev/api/wordlists?letter=${firstletter}&length=${length}&dict=${type}`)
        return await x.json();
    }
  }
}
interface IDictionary {
  words: (firstletter: ScrabbleLetter, length:number) => Promise<string[]>
}

export const useDictionary = () => {
  const [type,] = useSettings();

  return Dictionary(type)
}