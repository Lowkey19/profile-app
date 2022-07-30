import React from 'react';

import { useUser } from './api/user';
import MainView from './views/MainView';
import UserContext from './providers/user';

function App() {
  const [user, userDispatch] = useUser();

  return (
    <UserContext.Provider value={{ store: { ...user }, dispatch: userDispatch }}>
      <MainView />
    </UserContext.Provider>
  );
}

export default App;
