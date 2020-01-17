import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App_hooks';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App appTitle='Person Container'/>, document.getElementById('root'));
// ReactDOM.render(<h1>Test</h1>, document.getElementById('root'));

registerServiceWorker();
