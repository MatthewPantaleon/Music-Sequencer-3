/**
 * @Date:   2020-02-05T17:37:27+00:00
 * @Last modified time: 2020-03-05T16:55:45+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';
import SoundTimeline from './SoundTimeline';
import AudioMixer from './AudioMixer';
import ChannelMixer from './ChannelMixer';

const fs = window.require("fs");

class SoundContainer extends Component{
 constructor(props){
   super(props);
   this.state = {
     timeLineHeight: 100,
     openChannelMixer: false,
     openAudioMixer: false
   };
 }

 showHide(name, check){
   this.setState({[name]: !this.state[name]}, () => {
     if(this.state[name]){
       this.setState({[check]: false});
     }
   });
 }

 componentDidMount(){
   // console.log(this.props);
 }

 render(){
   return(
     <>
     <div className="row p-0">
        <div className="col-12 p-0" style={{height: `calc(${this.state.openChannelMixer || this.state.openAudioMixer ? 70 : 100}vh - 120px)`}}>
          <SoundTimeline
            isPanelOpen={this.state.openChannelMixer || this.state.openAudioMixer}
            soundChannels={this.props.soundChannels}
            clearChannels={this.props.clearChannels}
            removeChannel={this.props.removeChannel}
            getBarData={this.props.getBarData}
            existingBars={this.props.existingBars}
            bpm={this.props.bpm}
            changeBpm={this.props.changeBpm}
            effects={this.props.effects}
          />
        </div>

        <div className="col-12 p-0">
          <div className="card" style={{border: 0}}>
            <div className="card-body p-0" style={{height: `calc(30vh)`, display: `${this.state.openChannelMixer ? "block" : "none"}`}}>
              <ChannelMixer
                changeVolume={this.props.changeVolume}
                effects={this.props.effects}
              />
            </div>

            <div className="card-body p-0" style={{height: `calc(30vh)`, display: `${this.state.openAudioMixer ? "block" : "none"}`}}>
              <AudioMixer />
            </div>

            <div className="card-header bg-dark" >
              <button className={"mr-3 " + (this.state.openChannelMixer ? "btn btn-primary" : "btn btn-secondary")} onClick={() => this.showHide("openChannelMixer", "openAudioMixer")}>Channel Mixer</button>
              <button className={(this.state.openAudioMixer ? "btn btn-primary" : "btn btn-secondary")} onClick={() => this.showHide("openAudioMixer", "openChannelMixer")}>Audio Mixer</button>
            </div>
          </div>
        </div>
      </div>
     </>
   );
 }
}

export default SoundContainer;
