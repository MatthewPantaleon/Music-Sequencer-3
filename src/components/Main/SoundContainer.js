/**
 * @Date:   2020-02-05T17:37:27+00:00
 * @Last modified time: 2020-02-12T19:58:17+00:00
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

 render(){
   return(
     <>
     <div className="row p-0">
        <div className="col-12 p-0" style={{height: `calc(${this.state.openChannelMixer || this.state.openAudioMixer ? 70 : 100}vh - 120px)`}}>
          <SoundTimeline />
        </div>

        <div className="col-12">

        </div>
        <div className="col-12 p-0">
          <div className="card" style={{border: 0}}>
            <div className="card-body p-0" style={{height: `calc(30vh)`, display: `${this.state.openChannelMixer ? "block" : "none"}`}}>
              <ChannelMixer />
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
