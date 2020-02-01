import React from 'react';

import { useQuery } from '@apollo/client';
import {
    TopRatedArtists, TopRatedArtistsVariables
} from '@app/apollo/__generated__/TopRatedArtists';

import Table from './TopArtistsTable';
import topRatedArtistsQuery from './topRatedArtistsQuery.graphql';

const TopArtistsTableContainer: React.FC = () => {
  const { loading, error, data } = useQuery<TopRatedArtists, TopRatedArtistsVariables>(
    topRatedArtistsQuery,
    { variables: { limit: 100 } },
  );

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Ups...</div>;
  } else if (data) {
    return <Table artists={data.topRatedArtists} />;
  }
  return null;
};

export default TopArtistsTableContainer;
