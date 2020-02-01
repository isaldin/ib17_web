import { find, map, propEq } from 'ramda';
import React from 'react';

import { useQuery } from '@apollo/client';
import {
    CurrentPlaylistQuery as CurrentPlaylistQueryType
} from '@app/apollo/__generated__/CurrentPlaylistQuery';
import {
    TopRatedArtists_topRatedArtists as Artist, TopRatedArtists_topRatedArtists_tracks as Track
} from '@app/apollo/__generated__/TopRatedArtists';
import GetPlaylistQuery from '@app/containers/Player/currentPlaylist.graphql';

import Cell from '../Cell';
import TableHeader from '../TableHeader';
import { Container, Table } from './Style';

interface PropsType {
  artists: Artist[];
}

const TopArtistsTable = (props: PropsType): React.FunctionComponentElement<PropsType> => {
  const { client, data } = useQuery<CurrentPlaylistQueryType>(GetPlaylistQuery);

  const playlistItems = data?.currentPlaylist?.tracks || [];

  const addToPlaylistAndPlay = (track: Track): void => {
    // TODO: use mutation here
    client.writeData<CurrentPlaylistQueryType>({
      data: {
        currentPlaylist: {
          __typename: 'Playlist',
          id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
          tracks: [track],
        },
      },
    });
    localStorage.setItem('playlist', JSON.stringify([track]));
  };

  const addToPlaylistQueue = (track: Track): void => {
    if (find(propEq('id', track.id), playlistItems)) {
      return;
    }

    // TODO: use mutation here
    client.writeData<CurrentPlaylistQueryType>({
      data: {
        currentPlaylist: {
          __typename: 'Playlist',
          id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
          tracks: [...playlistItems, track],
        },
      },
    });
    localStorage.setItem('playlist', JSON.stringify([...playlistItems, track]));
  };

  return (
    <Container>
      <Table>
        <TableHeader />
        {map(
          artist => (
            <Cell onPlayPauseClick={addToPlaylistAndPlay} key={artist.id} artist={artist} />
          ),
          props.artists,
        )}
      </Table>
    </Container>
  );
};

export default TopArtistsTable;
