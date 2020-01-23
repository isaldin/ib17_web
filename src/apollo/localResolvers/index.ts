import { CurrentPlaylistQuery_currentPlaylist as Playlist } from '@app/apollo/__generated__/CurrentPlaylistQuery';

import { moveTrackUpInPlaylist } from './mutations';

export default {
  Query: {
    currentPlaylist: (): Playlist => ({
      __typename: 'Playlist',
      id: 'UGxheWxpc3Q6MQ==', // 'Playlist:1'
      tracks: [],
    }),
  },

  Mutation: {
    moveTrackUpInPlaylist,
  },
};
