import React, { createContext, FunctionComponent, ComponentType, useState } from 'react'
import "./Dictionary.css"

type ContextState = { status: 'LOADING' | 'ERROR' } | { status: 'LOADED' ; words: string[] };

const DictionaryContext = createContext<ContextState>({ status: 'LOADING' });

const NavControlContext = createContext<[boolean, () => void]>([false, () => {}]);

export const useNavControl = (): [boolean, () => void] => {
 
  const [contextState, toggle] = React.useContext(NavControlContext);

  if (contextState === null) {
    throw new Error('useNavControl must be used within a NavControlProvider');
  }

  return [contextState, toggle];
}

export const useDictionary = (): ContextState => {
  const contextState = React.useContext(DictionaryContext);
  if (contextState === null) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }

  return contextState;
};

export const NavControlProvder: FunctionComponent = ({ children }) => {
  const [state, setState] = useState(true);
  return (
    <NavControlContext.Provider value={[state, () => setState(!state)]}>
      {children}
    </NavControlContext.Provider>
  );
}

export const DictionaryProvider: FunctionComponent = ({ children }) => {
  const [state, setState] =  React.useState<ContextState>({ status: 'LOADING' });

  React.useEffect(() => {
    setState({ status: 'LOADING' });

    (async (): Promise<void> => {
      const result = await fetch("/dictionaries/sowpods.txt")

      if (result.ok) {
        const text = await result.text();
        const words = text.split(/\r?\n/).map(x => x.toUpperCase())

        setState({
          status: 'LOADED',
          words,
        });
      } else {
        setState({ status: 'ERROR' });
      }
    })();
  },[]);

  return (
    <DictionaryContext.Provider value={state}>
      {children}
    </DictionaryContext.Provider>
  );
}

const Loader: FunctionComponent = ({ children }) => {
  const dictionary = useDictionary();

  if (dictionary.status === "LOADING" || dictionary.status === "ERROR") {
    return <div className="Overlay"></div>;
  }
  return <div>{children}</div>;
}

export function waitForDictionary<T>(WrappedComponent: ComponentType<T>) {

  return (props: T) => {
    return (
      <Loader>
        <WrappedComponent{...props}></WrappedComponent>
      </Loader>
    )  
  }
}

