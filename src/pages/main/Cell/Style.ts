import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  align-items: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const Artist = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin-left: 10px;
`;
const Name = styled.div`
  font-weight: bold;
`;
const Location = styled.div`
  font-size: 12px;
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

export { Container, Artist, Name, Location, Tracks, Ratings, JudgesRating, PopularRating };
