import React from 'react';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import localResolvers from '@app/apollo/localResolvers';

import MainPage from '@app/pages/main';
import { PlayerContainerPortal } from '@app/containers/Player';

const cache = new InMemoryCache();
try {
  cache.writeData({
    data: {
      currentPlaylist: {
        __typename: 'Playlist',
        id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
        tracks: JSON.parse(localStorage.getItem('playlist') || '[]'),
      },
    },
  });
} catch (error) {
  console.error(error);
}

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  resolvers: {
    ...localResolvers,
  },
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
