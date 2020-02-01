import React from 'react';

import Page from '@app/layout/Page';

import { Header } from './Style';
import TopArtistsTable from './Table';

const MainPage: React.FC = () => (
  <Page>
    <Header>Top 100</Header>
    <TopArtistsTable />
  </Page>
);

export default MainPage;
