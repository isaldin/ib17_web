import React from 'react';
import ReactDOM from 'react-dom';

import PlayerContainer from './PlayerContainer';

import styles from './PlayerContainer.scss';

const PlayerPortal = (): React.ReactPortal | null => {
  const playerRoot = document.getElementById('player-root');
  if (playerRoot) {
    playerRoot.setAttribute('class', styles.container);
    return ReactDOM.createPortal(<PlayerContainer />, playerRoot);
  } else {
    return null;
  }
};

export default PlayerPortal;
