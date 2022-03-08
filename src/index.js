import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

import './sass/styles.scss';

ReactDOM.render(
    <App maxStories={10} />,
    document.getElementById('root')
)