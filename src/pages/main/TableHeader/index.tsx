import React from 'react';

import { Artist, Container, JudgesRating, PopularRating, Ratings, Tracks } from './Style';

const Cell: React.FC = () => (
  <Container>
    <Artist>Артист</Artist>
    <Tracks>
      <span>Раунд 1</span>
      <span>Раунд 2</span>
      <span>Раунд 3</span>
    </Tracks>
    <Ratings>
      <JudgesRating>Судьи</JudgesRating>
      <PopularRating>Зрители</PopularRating>
    </Ratings>
  </Container>
);

export default Cell;
