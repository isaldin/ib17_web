import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import App from '@app/containers/App';

import './assets/styles/global.scss';
import globalStyles from './assets/styles/global.scss';

const rootContainer = document.getElementById('root');
rootContainer?.setAttribute('class', globalStyles.root);

ReactDOM.render(<App />, rootContainer);
