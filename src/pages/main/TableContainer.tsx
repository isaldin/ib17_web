import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TopRatedArtists } from './__generated__/TopRatedArtists';
import topRatedArtistsQuery from './topRatedArtistsQuery.graphql';

import Table from './Table';

const TopArtistsTableContainer: React.FC = () => {
  const { loading, error, data } = useQuery<TopRatedArtists>(topRatedArtistsQuery);

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
