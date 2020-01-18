import React from 'react';

import MainPage from '@app/pages/main';

import { PlayerContainerPortal } from '@app/containers/Player';

class App extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <>
        <MainPage />
        <PlayerContainerPortal />
      </>
    );
  }
}

export default App;
