import { InMemoryCache } from '@apollo/client';

import {
  CurrentPlaylistQuery,
  // CurrentPlaylistQuery_currentPlaylist as Playlist,
} from '@app/apollo/__generated__/CurrentPlaylistQuery';
import currentPlaylistQuery from '@app/containers/Player/currentPlaylist.graphql';
import { findIndex, propEq, move } from 'ramda';

interface ArgsType {
  trackId: string;
  playlistId: string;
}

interface LocalResolversContextType {
  cache: InMemoryCache;
}

type LocalMutationFnType<Args, Result = void> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _root: any,
  args: Args,
  context: LocalResolversContextType,
) => Result | null;

const mutation: LocalMutationFnType<ArgsType> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _root: any,
  { trackId, playlistId },
  { cache },
) => {
  const prevPlaylistQueryResult = cache.readQuery<CurrentPlaylistQuery>({
    query: currentPlaylistQuery,
  });

  if (!prevPlaylistQueryResult || prevPlaylistQueryResult.currentPlaylist.id !== playlistId) {
    return;
  }

  const prevPlaylist = prevPlaylistQueryResult.currentPlaylist;

  const currentIdx = findIndex(propEq('id', trackId), prevPlaylist.tracks);
  if (currentIdx === -1) {
    return;
  }

  const newTracks = move(currentIdx, currentIdx - 1, prevPlaylist.tracks);

  cache.writeData<CurrentPlaylistQuery>({
    data: {
      currentPlaylist: {
        ...prevPlaylist,
        tracks: newTracks,
      },
    },
  });
  localStorage.setItem('playlist', JSON.stringify(newTracks));

  return;
};

export default mutation;
