/**
 * @Date:   2020-02-05T18:19:01+00:00
 * @Last modified time: 2020-02-26T16:14:04+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import SoundChannel from "./SoundChannel";

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();




let globalInterval;
let init = true;



class SoundTimeline extends Component{
  constructor(props){
    super(props);
    this.state = {
      channelArray: [],
      isPlaying: false,
      bpm: 120,
      timeIndex: 0
    };
  }

  componentWillMount(){

  }

  componentDidUpdate(){

  }

  bpm(that){
    // console.log("rgji: " + globalOffset);
    let t = that.state.timeIndex;
    t++;
    if(that.state.timeIndex < 28){
      that.setState({timeIndex: t}, () => console.log(that.state.timeIndex));
    }else{
      that.setState({timeIndex: 0});
    }
  }

  playChannels(){
    if(this.props.soundChannels.length === 0){
      alert("There are no Channels to play!");
      return;
    }
    if(this.state.isPlaying){
      console.log("Stopping");
      this.setState({isPlaying: false, timeIndex: 0});
      clearInterval(globalInterval);

    }else{
      console.log("PLaying");
      this.setState({isPlaying: true});
      globalInterval = setInterval(this.bpm, this.calcBpm(this.state.bpm), this);

    }
  }

  calcBpm(bpm){
    return 1000 * (60 / bpm);
  }

  split = (str) => { //fastest
    return str ? str.split('\\').pop().split('/').pop() : false;
  };

  render(){
    return(
      <>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <div className="btn text-white"> Timeline</div>
          </div>
          <div className="card-body bg-secondary" style={{height: "calc(100vh - 120px)"}}>
            <div className="row bg-dark mr-1">
              <div className="col-12 mb-2">
                <button className="btn btn-secondary mt-2 mb-4 mr-3" onClick={() => this.playChannels()}>{this.state.isPlaying ? "Stop" : "Play Button"}</button>
                <button className="btn btn-secondary mt-2 mb-4" onClick={() => this.props.clearChannels()}>Clear Channels</button>
              </div>
              <ul className="list-group col-12" style={{height: (this.props.isPanelOpen ? "calc(48vh)" : "calc(78vh)"), overflowY: "auto"}}>
              {this.props.soundChannels.length === 0 ? <li className="list-group-item bg-dark text-white">There are no Channels</li> : this.props.soundChannels.map((e, i) => {
                return <li key={i} className="list-group-item bg-dark"><SoundChannel id={i+1} name={this.split(e)} time={this.state.timeIndex} isPlaying={this.state.isPlaying} soundUrl={e}/></li>;
              })}
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
