import React from 'react';
import { useQuery } from '@apollo/client';

import PlayerContainer from './PlayerContainer';
import { CurrentPlaylistQuery } from '@app/apollo/__generated__/CurrentPlaylistQuery';

import { PlaylistItemType } from '@app/components/Playlist';

import currentPlaylistQuery from './currentPlaylist.graphql';
import { map } from 'ramda';

const HOC: React.FC = () => {
  const { data, loading, error } = useQuery<CurrentPlaylistQuery>(currentPlaylistQuery);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>ERROR</div>;
  } else if (data) {
    let tracks: PlaylistItemType[] = [];
    if (data?.currentPlaylist) {
      tracks = map(
        item => ({
          trackId: item.id,
          artist: item.artist.name,
          trackName: item.trackName,
          url: item.path,
        }),
        data.currentPlaylist,
      );
    }
    return <PlayerContainer tracks={tracks} />;
  }

  return null;
};

export default HOC;
