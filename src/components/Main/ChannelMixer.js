/**
 * @Date:   2020-02-05T19:27:18+00:00
 * @Last modified time: 2020-02-28T18:12:37+00:00
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
    this.state = {
      selectedEffect: "",
      volume: 1,
    };
  }


  changeSelected(e){
    this.setState({selectedFile: e.target.value});
  }

  volumeControls(){
    return(
      <>
        <input className="form-control-range" type="range" min="0" max="100" />
        <p></p>
      </>
    );
  }


  render(){
    return(
      <>
      <div className="card p-0 m-0" style={{height: "100%"}}>
        <div className="card-header bg-dark text-white">
          <h4>Channel Mixer</h4>

        </div>
        <div className="card-body bg-secondary">
          <div className="row mr-1">
            <div className="col-3">
              <h5 className="float-left text-white">Effects</h5>
              <button className="btn btn-dark float-right">Apply/Remove</button>

              <select className="custom-select" size="10" style={{height: "100%"}} onChange={(e) => this.changeSelected(e)}>
                <option value="volume">Volume</option>
                <option value="playBackRate">playBackRate</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-9 text-white" style={debugBorder()}>
              {this.state.selectedFile === "volume" ? this.volumeControls() : <></>}
              {this.state.selectedFile === "playBackRate" ? <p>playBackRate Controls</p> : <></>}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

}

function debugBorder(color = "red", size = "1px", type = "solid"){
  return {border: size +" "+ type +" " + color};
}


export default ChannelMixer;
