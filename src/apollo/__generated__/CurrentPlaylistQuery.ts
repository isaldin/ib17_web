/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentPlaylistQuery
// ====================================================

export interface CurrentPlaylistQuery_currentPlaylist_tracks_artist {
  __typename: "Artist";
  id: string;
  name: string;
}

export interface CurrentPlaylistQuery_currentPlaylist_tracks {
  __typename: "Track";
  id: string;
  path: string | null;
  trackName: string;
  artist: CurrentPlaylistQuery_currentPlaylist_tracks_artist;
}

export interface CurrentPlaylistQuery_currentPlaylist {
  __typename: "Playlist";
  id: string;
  tracks: CurrentPlaylistQuery_currentPlaylist_tracks[];
}

export interface CurrentPlaylistQuery {
  currentPlaylist: CurrentPlaylistQuery_currentPlaylist;
}
