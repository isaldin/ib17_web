import React from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import MainPage from '@app/pages/main';

import { PlayerContainerPortal } from '@app/containers/Player';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
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
