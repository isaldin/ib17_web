import React from 'react';
import ReactDOM from 'react-dom';

import PlayerContainerHOC from './PlayerContainerHOC';

import styles from './PlayerContainer.scss';

const PlayerPortal = (): React.ReactPortal | null => {
  const playerRoot = document.getElementById('player-root');
  if (playerRoot) {
    playerRoot.setAttribute('class', styles.container);
    return ReactDOM.createPortal(<PlayerContainerHOC />, playerRoot);
  } else {
    return null;
  }
};

export default PlayerPortal;
