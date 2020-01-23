import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { map } from 'ramda';

import { CurrentPlaylistQuery } from '@app/apollo/__generated__/CurrentPlaylistQuery';
import {
  MoveTrackUpMutation,
  MoveTrackUpMutationVariables,
} from '@app/apollo/__generated__/MoveTrackUpMutation';
import moveTrackUpMutationGQL from './moveTrackUpMutation.graphql';
import { PlaylistItemType } from '@app/components/Playlist';

import PlayerContainer from './PlayerContainer';
import currentPlaylistQuery from './currentPlaylist.graphql';
import { PlayerProvider } from './PlayerProvider';

const HOC: React.FC = () => {
  const { data, loading, error } = useQuery<CurrentPlaylistQuery>(currentPlaylistQuery);

  const [moveTrackUpMutation] = useMutation<MoveTrackUpMutation, MoveTrackUpMutationVariables>(
    moveTrackUpMutationGQL,
  );

  const moveTrackUp = (trackId: string, playlistId: string): void => {
    moveTrackUpMutation({
      variables: {
        playlistId,
        trackId,
      },
    });
  };
  const moveTrackDown = (_trackId: string): void => {
    //
  };
  const deleteTrackFromPlaylist = (_trackId: string): void => {
    //
  };

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>ERROR</div>;
  } else if (data) {
    const { id } = data.currentPlaylist;
    let tracks: PlaylistItemType[] = [];
    if (data?.currentPlaylist) {
      tracks = map(
        item => ({
          trackId: item.id,
          artist: item.artist.name,
          trackName: item.trackName,
          url: item.path,
        }),
        data.currentPlaylist.tracks,
      );
    }
    return (
      <PlayerProvider
        value={{
          moveTrackUp,
          moveTrackDown,
          deleteTrackFromPlaylist,
        }}>
        <PlayerContainer playlistId={id} tracks={tracks} />
      </PlayerProvider>
    );
  }

  return null;
};

export default HOC;
