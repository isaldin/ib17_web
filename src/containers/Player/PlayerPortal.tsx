import React from 'react';
import ReactDOM from 'react-dom';

import PlayerContainerHOC from './PlayerContainerHOC';

const PlayerPortal = (): React.ReactPortal | null =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ReactDOM.createPortal(<PlayerContainerHOC />, document.getElementById('player-root')!);

export default PlayerPortal;
