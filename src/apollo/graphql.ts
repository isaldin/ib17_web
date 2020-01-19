export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Artist = {
   __typename?: 'Artist',
  id: Scalars['ID'],
  name: Scalars['String'],
  location?: Maybe<Scalars['String']>,
  overallJudgesRating: Scalars['Float'],
  overallPopularRating: Scalars['Float'],
  tracks: Array<Track>,
};

export type Query = {
   __typename?: 'Query',
  topRatedArtists: Array<Artist>,
};


export type QueryTopRatedArtistsArgs = {
  limit: Scalars['Int'],
  sort: TopRatedArtistsSort
};

export enum TopRatedArtistsSort {
  JudgesRating = 'JUDGES_RATING',
  PopularRating = 'POPULAR_RATING'
}

export type Track = {
   __typename?: 'Track',
  id: Scalars['ID'],
  path?: Maybe<Scalars['String']>,
  round: Scalars['Float'],
};

export type TopRatedArtistsQueryVariables = {
  sort?: Maybe<TopRatedArtistsSort>,
  limit?: Maybe<Scalars['Int']>
};


export type TopRatedArtistsQuery = (
  { __typename?: 'Query' }
  & { topRatedArtists: Array<(
    { __typename?: 'Artist' }
    & Pick<Artist, 'id' | 'name' | 'overallJudgesRating' | 'overallPopularRating' | 'location'>
    & { tracks: Array<(
      { __typename?: 'Track' }
      & Pick<Track, 'id' | 'round' | 'path'>
    )> }
  )> }
);


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    