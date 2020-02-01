import styled from 'styled-components';

interface PlaybackButtonProps {
  background?: string;
  color?: string;
}
const PlaybackButton = styled.button<PlaybackButtonProps>`
  width: 20px;
  height: 20px;
  border: 0;
  color: ${props => props.color || `goldenrod`};
  background-color: ${props => props.background || `transparent`};
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;

  :hover {
    color: green;
  }

  :focus {
    outline: 0;
  }
`;

export { PlaybackButton };
