import React, { FunctionComponent, createContext } from 'react'


export type DictionaryType = "SOWPODS" | "ENABLE"
const SettingsContext = createContext<[DictionaryType, (x: DictionaryType) => void]>(["SOWPODS", x => {}]);

export const SettingsProvider: FunctionComponent = ({ children }) => {

    const settings = localStorage.getItem('settings') as DictionaryType

    const [state, setState] =  React.useState<DictionaryType>(settings ?? "SOWPODS");

    const updateState = (setting: DictionaryType) => {
      localStorage.setItem('settings', setting) 
      setState(setting)
    }
    
    return (
      <SettingsContext.Provider value={[state, updateState]}>
        {children}
      </SettingsContext.Provider>
    );
  }

  export const useSettings = (): [DictionaryType,  (x: DictionaryType) => void] => {
 
    const [state, control] = React.useContext(SettingsContext);
  
    if (state === null) {
      throw new Error('useSettings must be used within a SettingsProvider');
    }
  
    return [state, control];
  }