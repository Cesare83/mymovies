import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';

//Load google fonts
WebFont.load({
  google: {
    families: ['Anton', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
