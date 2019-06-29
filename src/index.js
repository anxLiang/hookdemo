import React from 'react';
import ReactDOM from 'react-dom';
import "assets/fonticons/fonts.css";
import './index.less';
import AppPortal from 'modules/portal';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppPortal />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
