import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import MainPage from '@app/pages/main';

import { PlayerContainerPortal } from '@app/containers/Player';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <ApolloProvider client={client}>
        <MainPage />
        <PlayerContainerPortal />
      </ApolloProvider>
    );
  }
}

export default App;
