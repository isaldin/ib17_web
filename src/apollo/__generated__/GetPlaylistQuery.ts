/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPlaylistQuery
// ====================================================

export interface GetPlaylistQuery_currentPlaylist {
  __typename: "Track";
  id: string;
  path: string | null;
  round: number;
}

export interface GetPlaylistQuery {
  currentPlaylist: GetPlaylistQuery_currentPlaylist[];
}
