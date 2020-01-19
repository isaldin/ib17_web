import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import PageContainer from '@app/containers/Page';

import TopArtistsTableContainer from './TableContainer';

const MainPage = (): React.FunctionComponentElement<{}> => (
  <PageContainer>
    <Container>
      <Header as="h3" textAlign="center">
        Top 100
      </Header>
      <TopArtistsTableContainer />
    </Container>
  </PageContainer>
);

export default MainPage;
