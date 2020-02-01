import React from 'react';

import { faBackward, faForward, faList, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PlaybackButton } from './Style';

interface PropsType {
  onClick: () => void;
}

const PlayButton: React.FC<PropsType> = props => (
  <PlaybackButton onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlay} />
  </PlaybackButton>
);

const PauseButton: React.FC<PropsType> = props => (
  <PlaybackButton onClick={props.onClick}>
    <FontAwesomeIcon icon={faPause} />
  </PlaybackButton>
);

const NextButton: React.FC<PropsType> = props => (
  <PlaybackButton onClick={props.onClick}>
    <FontAwesomeIcon icon={faForward} />
  </PlaybackButton>
);

const PrevButton: React.FC<PropsType> = props => (
  <PlaybackButton onClick={props.onClick}>
    <FontAwesomeIcon icon={faBackward} />
  </PlaybackButton>
);

const ListButton: React.FC<PropsType> = props => (
  <PlaybackButton onClick={props.onClick}>
    <FontAwesomeIcon icon={faList} />
  </PlaybackButton>
);

export { PlayButton, PauseButton, PrevButton, NextButton, ListButton };
