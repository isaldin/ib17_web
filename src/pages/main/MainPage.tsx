import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import PageContainer from '@app/containers/Page';

import TopArtistsTable from './Table';

const MainPage = (): React.FunctionComponentElement<{}> => (
  <PageContainer>
    <Container>
      <Header as="h3" textAlign="center">
        Top 100
      </Header>
      <TopArtistsTable />
    </Container>
  </PageContainer>
);

export default MainPage;
