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
    // console.log(this.props.effects);
  }

  changeSelectedEffect(e){
    this.setState({selectedEffect: e.target.value});
  }

  changeSelectedChannel(e){
    this.setState({selectedChannel: e.target.value});
  }

  volumeControls(){
    if(this.state.selectedChannel !== "none" && this.props.effects.length > 0){
      // console.log(this.props.effects);
      // console.log(this.state.selectedChannel);
      let all = this.props.effects.filter(x => x !== undefined);
      return(
        <>
          <p>Volume Controls</p>
          <input className="form-control-range slider" type="range" min="0" max="100" onChange={(e) => this.props.changeVolume(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Volume multiplier: {all.length > 0 && all[all.findIndex(x => x.id == this.state.selectedChannel)] ? all[all.findIndex(x => x.id == this.state.selectedChannel)].volume : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changeVolume(this.state.selectedChannel || undefined, 100)}>Reset Volume</button>
        </>
      );
    }else{
      this.state.selectedChannel = "none";
    }
  }

  playBackRate(){
    if(this.state.selectedChannel !== "none" && this.props.effects.length > 0){
      // console.log(this.props.effects);
      // console.log(this.state.selectedChannel);
      let all = this.props.effects.filter(x => x !== undefined);
      return(
        <>
          <p>playBackRate Controls</p>
          <input className="form-control-range slider" type="range" min="5" max="500" onChange={(e) => this.props.changePlaybackRate(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Playback value: {all.length > 0 ? all[all.findIndex(x => x.id == this.state.selectedChannel)].playbackRate : 0}</small>
          <br />
          <small>Current Playback Duration: {all.length > 0 && all[all.findIndex(x => x.id == this.state.selectedChannel)] ? (all[all.findIndex(x => x.id == this.state.selectedChannel)].duration / all[all.findIndex(x => x.id == this.state.selectedChannel)].playbackRate).toFixed(3) : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changePlaybackRate(this.state.selectedChannel || undefined, 100)}>Reset Playback Rate</button>
        </>
      );
    }else{
      this.state.selectedChannel = "none";
    }
  }

  pitchControls(){
    if(this.state.selectedChannel !== "none" && this.props.effects.length > 0){
      return(
        <>
          <p>playBackRate Controls</p>
          <input className="form-control-range slider" type="range" min="-2000" max="2000" onChange={(e) => this.props.changePitch(this.state.selectedChannel || undefined, e.target.value)} />
          <small>Current Pitch value: {this.props.effects.length > 0 ? this.props.effects[parseInt(this.state.selectedChannel) - 1].pitch : 0}</small>
          <br />
          <button className="btn btn-dark" onClick={(e) => this.props.changePitch(this.state.selectedChannel || undefined, 0)}>Reset Pitch</button>
        </>
      );
    }else{
      this.state.selectedChannel = "none";
    }
  }

  changeSubset(){
    if(this.state.selectedChannel !== "none" && this.props.effects.length > 0){
      let efs = this.props.effects[parseInt(this.state.selectedChannel) - 1] ? this.props.effects[parseInt(this.state.selectedChannel) - 1] : {duration: 0};
      return(<>
        <p>playBackRate Controls</p>
        <input className="form-control-range" type="range" min="0" max={efs.duration*1000} onChange={(e) => this.props.changeSubset(this.state.selectedChannel || undefined, e.target.value, "start")} />
        <input className="form-control-range" type="range" min="0" max={(efs.duration*1000)} onChange={(e) => this.props.changeSubset(this.state.selectedChannel || undefined, e.target.value, "end")} />
        <small>Start value: {this.props.effects.length > 0 ? efs.start : 0}</small>
        <br />
        <small>End value: {this.props.effects.length > 0 ? efs.end : 0}</small>
        <br />
      </>);
    }else{
      this.state.selectedChannel = "none";
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
              console.log(e);
              if(e === undefined || e === null)return;
              console.log(e);
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

              <select className="custom-select" size="4" style={{height: "100%"}} onChange={(e) => this.changeSelectedEffect(e)}>
                <option value="volume">Volume</option>
                <option value="playBackRate">playBackRate</option>
                {/*<option value="pitch">Pitch</option>*/}
                {/*<option value="subset">Select Audio Subset</option>*/}
              </select>
            </div>
            <div className="col-9 text-white">
              {this.state.selectedEffect === "volume" ? this.volumeControls() : <></>}
              {this.state.selectedEffect === "playBackRate" ? this.playBackRate() : <></>}
              {this.state.selectedEffect === "pitch" ? this.pitchControls() : <></>}
              {/*this.state.selectedEffect === "subset" ? this.changeSubset() : <></>*/}
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
