/**
 * @Date:   2020-01-03T02:49:14+00:00
 * @Last modified time: 2020-01-17T18:36:41+00:00
 */



import React, { Component } from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import bruh from "./sounds/Bruh.mp3"
import 'bootstrap/dist/css/bootstrap.css';

import BC from "./components/BaseCheck";
import F from "./components/File";
import SA from "./components/ApiCall";
import M from "./components/Main/Main";


class App extends Component {



  render() {
    return (
      <>
        <BrowserRouter>
          <Redirect exact from="/" to="/main" />

          <Link to="/BaseCheck">Base Check | </Link>
          <Link to="/SoundFiles">Sound Files | </Link>
          <Link to="/SoundAPI">Sound API | </Link>
          <Link to="/main">Main Tab | </Link>

          <div className="container">
            <div className="row">
              <Route exact path="/BaseCheck" component={BC}/>
              <Route exact path="/SoundFiles" component={F}/>
              <Route exact path="/SoundAPI" component={SA}/>

            </div>
          </div>
          <Route exact path="/main" component={M}/>

        </BrowserRouter>
      </>
    );
  }
}


export default App;
