/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentPlaylistQuery
// ====================================================

export interface CurrentPlaylistQuery_currentPlaylist_artist {
  __typename: "Artist";
  name: string;
}

export interface CurrentPlaylistQuery_currentPlaylist {
  __typename: "Track";
  id: string;
  path: string | null;
  trackName: string;
  artist: CurrentPlaylistQuery_currentPlaylist_artist;
}

export interface CurrentPlaylistQuery {
  currentPlaylist: CurrentPlaylistQuery_currentPlaylist[];
}
