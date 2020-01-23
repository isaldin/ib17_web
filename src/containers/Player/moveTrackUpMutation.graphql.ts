import { gql } from '@apollo/client';

const mutation = gql`
  mutation MoveTrackUpMutation($playlistId: ID!, $trackId: ID!) {
    moveTrackUpInPlaylist(trackId: $trackId, playlistId: $playlistId) @client(always: true)
  }
`;

export default mutation;
