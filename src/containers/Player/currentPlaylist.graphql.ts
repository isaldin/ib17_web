import { gql } from '@apollo/client';

const currentPlaylistQuery = gql`
  query CurrentPlaylistQuery {
    currentPlaylist @client {
      id
      path
      trackName
      artist {
        name
      }
    }
  }
`;

export default currentPlaylistQuery;
