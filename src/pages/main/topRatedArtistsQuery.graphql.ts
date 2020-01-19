import gql from 'graphql-tag';

export default gql`
  query TopRatedArtists($sort: TopRatedArtistsSort = JUDGES_RATING, $limit: Int = 25) {
    topRatedArtists(limit: $limit, sort: $sort) {
      id
      name
      overallJudgesRating
      overallPopularRating
      location
      tracks {
        id
        round
        path
      }
    }
  }
`;
