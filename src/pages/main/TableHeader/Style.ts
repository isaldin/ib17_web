import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid lightgray;
  margin-bottom: 5px;
`;

const Artist = styled.div`
  display: flex;
  flex: 3;
  justify-content: center;
  margin-left: 10px;
`;

const Tracks = styled.div`
  display: flex;
  flex: 6;
  justify-content: space-around;
`;

const Ratings = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const JudgesRating = styled.div``;
const PopularRating = styled.div``;

export { Container, Artist, Tracks, Ratings, JudgesRating, PopularRating };
