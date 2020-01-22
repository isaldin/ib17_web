import { gql } from '@apollo/client';

const currentPlaylistQuery = gql`
  query CurrentPlaylistQuery {
    currentPlaylist @client {
      id
      path
      trackName
      artist {
        id
        name
      }
    }
  }
`;

export default currentPlaylistQuery;
