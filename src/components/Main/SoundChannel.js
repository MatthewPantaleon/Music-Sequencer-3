/**
 * @Date:   2020-02-24T08:59:30+00:00
 * @Last modified time: 2020-03-11T19:33:40+00:00
 */

 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';
 import PitchShift from "soundbank-pitch-shift";
 import { loadAudioBuffer } from 'audiobuffer-loader';

 class SoundChannel extends Component{
   constructor(props){
     super(props);
     this.state = {
       barInterval: 4,
       segments: 28,
       bar: [],
       soundResource: "",
       activatedColor: ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff", "#800", "#080", "#008", "#880", "#808", "#088"],
       normalColor: "#777",
       sound: new Audio(this.props.soundUrl) || "",
       soundBuffer: {},
       mute: false
     };
   }



   async componentWillMount(){
     let segments = [];

     let exist = this.props.existingBar;
     if(!exist){
       exist = [{id: -1}];
     }

     for(let i = 0; i < this.state.segments * this.props.pages.length; i++){
       // let backgroundColor = "#777";
       let isEnd = false;
       if((i+1) % this.state.barInterval === 0){
         // backgroundColor = "#444"
         isEnd = true;
       }

       if(exist[0].id !== this.props.id){//for adding new channels
         segments.push({id: this.props.id, segmentId: i, activeColor: this.state.activatedColor[(this.props.id % this.state.activatedColor.length) -1] || "#fff", isEnd, active: false});
       }else{//for creating channels that were loaded in
         segments.push(this.props.existingBar[i]);
       }
     }
     this.props.getBarData(segments, this.props.soundUrl);
     // console.log(segments);

     let ac = new AudioContext();

     //may not work continously rapidly enough
     let s = await loadAudioBuffer(ac, this.props.soundUrl).then((r) => {
       return r.audioBuffer;
     });
     this.setState({bar: segments, soundBuffer: s});
   }

   //play sound when adding a new channel set to false by default can be toggled later
   activate(id, i){
     // console.log("This is something from channel: "+ id + ". Position: " + (i+1));
     // console.log(this.state.activatedColor[id]);
     let allBar = this.state.bar;
     allBar[i].active = !allBar[i].active;
     this.setState({bar: allBar}, () => {
       if(false)new Audio(this.props.soundUrl).volume(parseFloat(this.props.effects.volume)).playbackRate(parseFloat(this.props.effects.playbackRate)).play();
     });
   }

   componentDidUpdate(pP, ps){
     // console.log(pP.pages);
     // console.log(pP.pages[pP.pages.length - 1] * this.state.segments);
     // console.log(this.state.bar.length);
     // console.log(this.props.effects);

     let newTotal = pP.pages[pP.pages.length - 1] * this.state.segments;
     let bars = this.state.bar;

     //adding a new page extends the bar array
     if(newTotal > this.state.bar.length){
       for(let i = 0; i < newTotal; i++){
         let isEnd = false;
         if((i+1) % this.state.barInterval === 0){
           // backgroundColor = "#444"
           isEnd = true;
         }
         if(!bars[i]){
           bars[i] = {id: this.props.id, segmentId: i, activeColor: this.state.activatedColor[(this.props.id % this.state.activatedColor.length) -1] || "#fff", isEnd, active: false};
         }
       }
       // console.log(this.state.bar);
     }

     //for removing a page how should the bar array be handled
     if(newTotal < this.state.bar.length){
       let subset = bars.slice((bars.length - 1) - this.state.segments, (bars.length - 1));
       // console.log(subset);

       //page validation for if some segments are active
       // if(!subset.every((e) => e.active == false)){
       //   if(!window.confirm("There are active bars on this page. Are you sure to Remove it? This cannot be undone!")){
       //     return;
       //   }
       // }
       // console.log("UUUGGGHHHHH!");
       for(let i = 0; i < this.state.segments; i++){
         bars.pop();
       }
       console.log(bars);
     }

   }

   async preview(){//preview sound, testing how audio effects here

     // this.state.sound.volume = 0.5;
     // console.log(new Audio(this.props.soundUrl).playbackRate);

     let t = this.state.sound;

     // t.volume = parseFloat(this.props.effects.volume);
     // t.playbackRate = parseFloat(this.props.effects.playbackRate);
     // t.play();

     let ac = new AudioContext();
     // console.log(ac.createMediaElementSource(t));
     // let s = ac.createMediaElementSource(t);
     // let s = ac.createMediaElementSource(t);
     // let s = ac.audioNode(t);


     //get audio data as an audiobuffernode object
     // s = await loadAudioBuffer(ac, this.props.soundUrl).then((r) => {
     //   return r.audioBuffer;
     // });

     // let s = this.state.soundBuffer;

     //testing to see if rebuffering is the the cause of inconsistent plauing
     let s = await loadAudioBuffer(ac, this.props.soundUrl).then((r) => {
       return r.audioBuffer;
     });
     // console.log(s);
     let source = ac.createBufferSource();
     let g = ac.createGain();
     source.buffer = s;
     // let ps = PitchShift(ac);

     source.playbackRate.value = this.props.effects.playbackRate;
     source.detune.value = this.props.effects.pitch;
     // source.preservePitch = true;

     // source.gain.value = 0.1;
     source.connect(g);
     // source.connect(ps);

     g.gain.value = this.props.effects.volume;
     g.connect(ac.destination);

     // console.log(source);

     // ps.connect(ac.destination);
     // console.log(s.sampleRate);
     // console.log("start: ", this.props.effects.start);
     // console.log("end/duration: ", this.props.effects.end - this.props.effects.start);
     // console.log(this.props.effects.duration);

     //time offset not implemented as its very inconsistent
     // source.start(0, ac.currentTime + this.props.effects.start.toFixed(2), ac.currentTime + (this.props.effects.end - this.props.effects.start).toFixed(2));
     // source.start(0, this.props.effects.start.toFixed(2));
     // source.stop(this.props.effects.end);
     // source.stop(ac.currentTime + 0.7);

     source.start();
     // t.playbackRate = this.props.effects.playbackRate;
     // let m = ac.createMediaElementSource(new Audio(this.props.soundUrl));
     // console.log(m);

     // m = null;
     // t.play();
     // m.connect(ac.destination);
     // m.start();


     // let ps = PitchShift(ac);
     // ps.connect(ac.destination);
     //
     // ps.connect(t);
     // console.log(ps);
     // ps.transpose(24);
     // ps.start();
     // ps.detune.value = -1200;

     //
     // console.log(s);
     // let source = s;

     // console.log(this.state.sound.duration);
     ac = null;
   }

   //how each segment is to be presented based on if it active or not
   segment(size = "1.9vw", backgroundColor = "#777", play, segment){
     if((play.index % this.state.segments) == play.time){
       let a = new Audio(this.props.soundUrl);
       // let ac = new AudioContext();
       // let source = ac.createBufferSource();
       // let g = ac.createGain();
       // let s = this.state.soundBuffer;
       // source.buffer = s;
       // let ps = PitchShift(ac);
       if(segment.active && this.props.isPlaying && !this.state.mute){
         a.volume = parseFloat(this.props.effects.volume);
         a.playbackRate = parseFloat(this.props.effects.playbackRate);
         a.play();
         // let s = this.state.soundBuffer;
         // source.playbackRate.value = this.props.effects.playbackRate;
         // source.detune.value = this.props.effects.pitch;
         // source.preservePitch = true;

         // source.gain.value = 0.1;
         // source.connect(g);
         // source.connect(ps);

         // g.gain.value = this.props.effects.volume;

         // console.log(source);
         // g.connect(ac.destination);
         // ps.connect(ac.destination);
         // console.log(s.sampleRate);
         // source.start(0, this.props.effects.start, (this.props.effects.duration) - this.props.effects.end);
         // source.start(0, this.props.effects.start.toFixed(2));
         // source.start();
       }
       // ac = null;
       return{width: size, height: size, backgroundColor, display: "inline-block", border: "2px solid #fff"};
     }else{
       return{width: size, height: size, backgroundColor, display: "inline-block"};
     }
   }

   //mute
   muteChannel(){
     let m = this.state.mute;
     this.setState({mute: !m});
   }

   //intermediary function to delete a channel
   removeChannel(e){
     this.props.removeChannel(e);
   }

   render(){
     return(
       <>
       <div className="col-12">
        <div className="row mb-1" >
          <div className="col-1">
            <button className="btn btn-secondary" onClick={() => this.preview()}>{this.props.name}</button>
          </div>
          <div className="col-11">
            {this.props.soundUrl !== "" || this.props.soundUrl !== undefined ? this.state.bar.map((e, i) => {
              if(i+1 > (this.props.currentPage-1)*this.state.segments && i < (this.props.currentPage)*this.state.segments){
                //if e does not exist add new ones but do not delete ones for now
                let color = this.state.normalColor;
                if(e.active){
                  color = e.activeColor;
                }else if(e.isEnd){
                  color = "#444"
                }
                return (
                <Fragment key={i}>
                  <div className="mr-1" onClick={() => {if(this.props.soundUrl)this.activate(this.props.id, i)}} style={this.segment(undefined, color, {index: i, time: this.props.time}, e)}> </div>
                </Fragment>);


              }

            }) : <></>}
            <button className="btn btn-danger m-0 float-right" onClick={() => this.removeChannel(this.props.id)}>X</button>
            <button className={"btn m-0 float-right " + (this.state.mute ? "btn-danger" : "btn-secondary")} onClick={() => this.muteChannel()}>{this.state.mute ? "Muted" : "Mute"}</button>
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

 export default SoundChannel;
