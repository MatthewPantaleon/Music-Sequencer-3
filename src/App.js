/**
 * @Date:   2020-01-03T02:49:14+00:00
 * @Last modified time: 2020-01-15T16:40:44+00:00
 */



import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bruh from "./sounds/Bruh.mp3";

const {app} = window.require('electron').remote;

class App extends Component {

  playSound(){
    new Audio(bruh).play();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
        </div>
        <p className="App-intro">
          <b> Release 0.2.7 </b>
          Version: {app.getVersion()}
        </p>
        <img src={require("./images/Arbalest.jpg")}/>
        <button onClick={() => {this.playSound()}}>Bruh</button>
      </div>
    );
  }
}

export default App;
