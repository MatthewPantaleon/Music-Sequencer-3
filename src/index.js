/**
 * @Date:   2020-01-15T16:27:07+00:00
 * @Last modified time: 2020-02-05T18:05:01+00:00
 */



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


const {webFrame} = window.require('electron');
webFrame.setZoomFactor(0.75);

ReactDOM.render(<App />, document.getElementById('root'));
