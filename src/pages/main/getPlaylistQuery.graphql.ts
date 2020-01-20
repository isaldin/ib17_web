import { gql } from '@apollo/client';

const GetPlaylist = gql`
  query GetPlaylistQuery {
    currentPlaylist @client {
      id
      path
      round
    }
  }
`;

export default GetPlaylist;
