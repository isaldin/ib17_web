import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TopRatedArtistsQuery } from '@app/apollo/graphql';
import topRatedArtistsQuery from './topRatedArtistsQuery.graphql';

import Table from './Table';

const TopArtistsTableContainer = (): React.FunctionComponentElement<{}> => {
  const { loading, error, data } = useQuery<TopRatedArtistsQuery>(topRatedArtistsQuery);

  if (data) {
    return <Table artists={data.topRatedArtists} />;
  }

  return <div />;
};

export default TopArtistsTableContainer;
