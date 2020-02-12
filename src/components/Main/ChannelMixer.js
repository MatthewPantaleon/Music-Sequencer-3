/**
 * @Date:   2020-02-05T19:27:18+00:00
 * @Last modified time: 2020-02-12T15:44:02+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();



class ChannelMixer extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <>
      <div className="card p-0 m-0" style={{height: "100%"}}>
        <div className="card-header bg-dark text-white">
          <h4>Channel Mixer</h4>
        </div>
        <div className="card-body bg-secondary">
          aerharheathathhat
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

export default ChannelMixer;
