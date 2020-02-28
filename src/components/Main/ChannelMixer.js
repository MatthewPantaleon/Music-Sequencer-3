/**
 * @Date:   2020-02-05T19:27:18+00:00
 * @Last modified time: 2020-02-28T16:23:24+00:00
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
          <div className="row">
            <div className="col-3">
              <h5 className="float-left text-white">Effects</h5>
              <button className="btn btn-dark float-right">Apply/Remove</button>

              <select className="custom-select" size="10" style={{height: "100%"}}>
                <option value="none">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

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

export default ChannelMixer;
