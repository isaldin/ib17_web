/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { TopRatedArtistsSort } from "./../globalTypes";

// ====================================================
// GraphQL query operation: TopRatedArtists
// ====================================================

export interface TopRatedArtists_topRatedArtists_tracks {
  __typename: "Track";
  id: string;
  round: number;
  path: string | null;
}

export interface TopRatedArtists_topRatedArtists {
  __typename: "Artist";
  id: string;
  name: string;
  overallJudgesRating: number;
  overallPopularRating: number;
  location: string | null;
  tracks: TopRatedArtists_topRatedArtists_tracks[];
}

export interface TopRatedArtists {
  topRatedArtists: TopRatedArtists_topRatedArtists[];
}

export interface TopRatedArtistsVariables {
  sort?: TopRatedArtistsSort | null;
  limit?: number | null;
}
