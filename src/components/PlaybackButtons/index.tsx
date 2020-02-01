import React from 'react';

import { faBackward, faForward, faList, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Style';

interface PropsType {
  onClick: () => void;
}

const PlayButton: React.FC<PropsType> = props => (
  <Button onClick={props.onClick}>
    <FontAwesomeIcon icon={faPlay} />
  </Button>
);

const PauseButton: React.FC<PropsType> = props => (
  <Button onClick={props.onClick}>
    <FontAwesomeIcon icon={faPause} />
  </Button>
);

const NextButton: React.FC<PropsType> = props => (
  <Button onClick={props.onClick}>
    <FontAwesomeIcon icon={faForward} />
  </Button>
);

const PrevButton: React.FC<PropsType> = props => (
  <Button onClick={props.onClick}>
    <FontAwesomeIcon icon={faBackward} />
  </Button>
);

const ListButton: React.FC<PropsType> = props => (
  <Button onClick={props.onClick}>
    <FontAwesomeIcon icon={faList} />
  </Button>
);

export { PlayButton, PauseButton, PrevButton, NextButton, ListButton };
