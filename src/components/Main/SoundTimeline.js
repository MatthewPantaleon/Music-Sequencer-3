/**
 * @Date:   2020-02-05T18:19:01+00:00
 * @Last modified time: 2020-02-24T10:35:30+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import SoundChannel from "./SoundChannel";

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();

class SoundTimeline extends Component{
  constructor(props){
    super(props);
    this.state = {
      channelArray: []
    };
  }

  componentDidMount(){

  }

  render(){
    return(
      <>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <div className="btn text-white"> Timeline</div>
          </div>
          <div className="card-body bg-secondary" style={{height: "calc(100vh - 120px)"}}>
            <div className="row bg-dark">
               <div className="col-2 mb-2">
                 <button className="btn btn-secondary">PlaceHolder</button>
               </div>

              {[<SoundChannel />, <SoundChannel />,<SoundChannel />]}
            </div>
          </div>
        </div>

      </>
    );
  }
}

let h = {
  tooltip: {
    height: 350
  },
  browser: {
    height: space.height - 360 + space.y
  }
};

export default SoundTimeline;
