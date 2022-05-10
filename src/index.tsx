import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

import './sass/styles.scss';

render(
    <App maxStories={10} />,
    document.getElementById('root')
)