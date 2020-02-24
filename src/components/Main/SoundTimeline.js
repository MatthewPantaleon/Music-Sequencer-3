/**
 * @Date:   2020-02-05T18:19:01+00:00
 * @Last modified time: 2020-02-24T20:03:04+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import SoundChannel from "./SoundChannel";

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();

let globalOffset = 0;
let globalInterval;

function bpm(){
  console.log("rgji: " + globalOffset);
  globalOffset++;
}

class SoundTimeline extends Component{
  constructor(props){
    super(props);
    this.state = {
      channelArray: [],
      isPlaying: false

    };
  }

  componentDidMount(){

    //debug channels
    let debug = [];
    for(let i = 0; i < 20; i++){
      debug.push(<li className="list-group-item bg-dark"><SoundChannel key={i} id={i+1} time={globalOffset}/></li>);
    }
    this.setState({channelArray: debug});
  }



  playChannels(){

    if(this.state.isPlaying){
      console.log("Stopping");
      this.setState({isPlaying: false});
      clearInterval(globalInterval);
      globalOffset = 0;

    }else{
      this.setState({isPlaying: true});
      globalInterval = setInterval(bpm, 500);

    }
  }

  render(){
    return(
      <>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <div className="btn text-white"> Timeline</div>
          </div>
          <div className="card-body bg-secondary" style={{height: "calc(100vh - 120px)"}}>
            <div className="row bg-dark mr-1">
              <div className="col-2 mb-2">
                <button className="btn btn-secondary mt-2 mb-4" onClick={() => this.playChannels()}>{this.state.isPlaying ? "Stop" : "Play Button"}</button>
              </div>
              <ul className="list-group col-12" style={{height: ((this.props.isPanelOpen) ? "calc(48vh)" : "calc(78vh)"), overflowY: "auto"}}>
              {this.state.channelArray}
              </ul>
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

export default SoundTimeline;
