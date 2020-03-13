/**
 * @Date:   2020-02-05T19:27:18+00:00
 * @Last modified time: 2020-03-11T17:52:36+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import { loadAudioBuffer } from 'audiobuffer-loader';

const electron = window.require('electron');
const remote = electron.remote;
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();



class ChannelMixer extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedEffect: "",
      volume: 1,
      selectedChannel: "none"
    };

  }

  componentDidMount(){
    console.log(this.props);
  }

  componentDidUpdate(){
    // console.log(this.props);
  }

  changeSelectedEffect(e){
    this.setState({selectedEffect: e.target.value});
  }

  changeSelectedChannel(e){
    this.setState({selectedChannel: e.target.value});
  }

  volumeControls(){
    if(this.state.selectedChannel !== "none"){
      return(
        <>
          <p>Volume Controls</p>
          <input className="form-control-range" type="range" min="0" max="2000" onChange={(e) => this.props.changeVolume(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Volume multiplier: {this.props.effects.length > 0 ? this.props.effects[parseInt(this.state.selectedChannel) - 1].volume : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changeVolume(this.state.selectedChannel || undefined, 100)}>Reset Volume</button>
        </>
      );
    }
  }

  playBackRate(){
    if(this.state.selectedChannel !== "none"){

      return(
        <>
          <p>playBackRate Controls</p>
          <input className="form-control-range" type="range" min="5" max="500" onChange={(e) => this.props.changePlaybackRate(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Playback value: {this.props.effects.length > 0 ? this.props.effects[parseInt(this.state.selectedChannel) - 1].playbackRate : 0}</small>
          <br />
          <small>Current Playback Duration: {this.props.effects.length > 0 ? (this.props.effects[parseInt(this.state.selectedChannel) - 1].duration / this.props.effects[parseInt(this.state.selectedChannel) - 1].playbackRate).toFixed(3) : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changePlaybackRate(this.state.selectedChannel || undefined, 100)}>Reset Playback Rate</button>
        </>
      );
    }
  }

  pitchControls(){
    if(this.state.selectedChannel !== "none"){
      return(
        <>
          <p>playBackRate Controls</p>
          <input className="form-control-range" type="range" min="-2000" max="2000" onChange={(e) => this.props.changePitch(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Pitch value: {this.props.effects.length > 0 ? this.props.effects[parseInt(this.state.selectedChannel) - 1].pitch : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changePitch(this.state.selectedChannel || undefined, 0)}>Reset Pitch</button>
        </>
      );
    }
  }
  render(){
    return(
      <>
      <div className="card p-0 m-0" style={{height: "100%"}}>
        <div className="card-header bg-dark text-white">
          <h4 style={{display: "inline-block"}}>Channel Mixer</h4>
          <select className="form-control col-2 float-right" onChange={(e) => this.changeSelectedChannel(e)}>
            <option value="none">Select Channel</option>
            {this.props.effects.map((e, i) => {
              if(e === undefined)return;
              return (
                <Fragment key={i}>
                  <option value={e.id}>{e.id}</option>
                </Fragment>);
            })}
          </select>
        </div>
        <div className="card-body bg-secondary">
          <div className="row mr-1">
            <div className="col-3">
              <h5 className="float-left text-white">Effects</h5>
              <button className="btn btn-dark float-right">Apply/Remove</button>

              <select className="custom-select" size="10" style={{height: "100%"}} onChange={(e) => this.changeSelectedEffect(e)}>
                <option value="volume">Volume</option>
                <option value="playBackRate">playBackRate</option>
                <option value="pitch">Pitch</option>
              </select>
            </div>
            <div className="col-9 text-white" style={debugBorder()}>
              {this.state.selectedEffect === "volume" ? this.volumeControls() : <></>}
              {this.state.selectedEffect === "playBackRate" ? this.playBackRate() : <></>}
              {this.state.selectedEffect === "pitch" ? this.pitchControls() : <></>}
              {/**/}
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
