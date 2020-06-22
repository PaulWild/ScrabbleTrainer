import React, { createContext, FunctionComponent,  useState } from 'react'

const NavControlContext = createContext<[boolean, () => void]>([false, () => {}]);

export const useNavControl = (): [boolean, () => void] => {
 
  const [contextState, toggle] = React.useContext(NavControlContext);

  if (contextState === null) {
    throw new Error('useNavControl must be used within a NavControlProvider');
  }

  return [contextState, toggle];
}


export const NavControlProvder: FunctionComponent = ({ children }) => {
    const [state, setState] = useState(true);
    return (
      <NavControlContext.Provider value={[state, () => setState(!state)]}>
        {children}
      </NavControlContext.Provider>
    );
  }