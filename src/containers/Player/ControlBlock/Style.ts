import styled from 'styled-components';

const Container = styled.div`
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 5px;
  box-shadow: 3px 3px 5px -2px rgba(0, 0, 0, 0.49);
  background-color: white;
`;

const Content = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const TrackInfo = styled.div``;

const Artist = styled.div`
  color: black;
  font-weight: bold;
`;

const TrackName = styled.span``;

const ProgressBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightgray;
  border-radius: 2px;
  cursor: pointer;
`;

interface ProgressProps {
  progress: number;
}
const Progress = styled.div<ProgressProps>`
  margin-bottom: 0 !important;
  appearance: none;
  height: 5px;
  border-radius: 2px;
  width: ${props => props.progress}%;
  background-color: #2185d0;
`;

const Buttons = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const PlaybackControls = styled.div``;

const Timing = styled.div`
  margin-top: 0;
`;

export {
  Container,
  Content,
  TrackInfo,
  Artist,
  TrackName,
  ProgressBar,
  Progress,
  Buttons,
  Timing,
  PlaybackControls,
};
