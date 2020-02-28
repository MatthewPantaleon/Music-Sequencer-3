/**
 * @Date:   2020-02-05T19:27:18+00:00
 * @Last modified time: 2020-02-28T20:24:52+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();



class AudioMixer extends Component{
  constructor(props){
    super(props);
    this.state = {
      min: 0,
      max: 100, //max value will change by sound data
      currentMin: 0,
      currentMax: 100
    };
  }

  changeTime(who, e){
    // console.log(e.target.value);
    this.setState({["current" + who]: e.target.value}, () => {
      if(this.state.currentMin > this.state.currentMax){
        this.setState({currentMax: this.state.currentMin});
      }
    });
  }

  // this component handles what time slice of audio is played for the channel
  render(){
    return(
      <>
      <div className="card p-0 m-0" style={{height: "100%"}}>
        <div className="card-header bg-dark text-white">
          <h4>Audio Mixer</h4>
        </div>
        <div className="card-body bg-secondary">
          <div className="row">
            <div className="col-12">
              <input className="form-control-range" type="range" min={this.state.min} max={this.state.max} value={this.state.currentMin} onChange={(e) => this.changeTime("Min", e)}/>
            </div>
            <div className="col-12">
              <input className="form-control-range" type="range" min={this.state.min} max={this.state.max} value={this.state.currentMax} onChange={(e) => this.changeTime("Max", e)}/>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

}

let h = {
  tooltip: {
    height: 325
  },
  browser: {
    height: space.height - 360 + space.y
  }
};

export default AudioMixer;
