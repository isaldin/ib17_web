import React from 'react';
import { ThemeProvider } from 'styled-components';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import localResolvers from '@app/apollo/localResolvers';
import { PlayerContainerPortal } from '@app/containers/Player';
import { theme } from '@app/layout/Theme';
import MainPage from '@app/pages/main';

import { GlobalStyle } from './Style';

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
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <MainPage />
          <PlayerContainerPortal />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
