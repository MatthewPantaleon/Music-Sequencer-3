/**
 * @Date:   2020-02-24T08:59:30+00:00
 * @Last modified time: 2020-03-10T19:05:50+00:00
 */

 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';

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
       mute: false
     };
   }



   componentWillMount(){
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
     this.props.getBarData(segments);
     console.log(segments);
     this.setState({bar: segments});
   }

   activate(id, i){
     // console.log("This is something from channel: "+ id + ". Position: " + (i+1));
     // console.log(this.state.activatedColor[id]);
     let allBar = this.state.bar;
     allBar[i].active = !allBar[i].active;
     this.setState({bar: allBar}, () => {
       if(false)new Audio(this.props.soundUrl).play();
     });
   }

   componentDidUpdate(pP, ps){
     // console.log(pP.pages);
     // console.log(pP.pages[pP.pages.length - 1] * this.state.segments);
     // console.log(this.state.bar.length);


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

       // if(!subset.every((e) => e.active == false)){
       //   if(!window.confirm("There are active bars on this page. Are you sure to Remove it? This cannot be undone!")){
       //     return;
       //   }
       // }
       console.log("UUUGGGHHHHH!");
       for(let i = 0; i < this.state.segments; i++){
         bars.pop();
       }
       console.log(bars);
     }

   }


   preview(){//preview sound, testing how audio effects here
     // this.state.sound.volume = 0.5;
     let t = this.state.sound;
     // console.log(new Audio(this.props.soundUrl));
     // console.log(parseFloat(this.props.effects.volume));
     t.volume = parseFloat(this.props.effects.volume);
     t.play();
     // console.log(this.state.sound.duration);

     // console.log(this.state.sound.currentTime);
     // console.log(this.state.sound.controls);
     // console.log(this.state.sound.srcObject);
     // let test = this.state.sound;
     // console.log(test.srcObject = new MediaStream());
     // console.log(test.playBackRate);

   }

   //how each segment is to be presented based on if it active or not
   segment(size = "1.9vw", backgroundColor = "#777", play, segment){
     if((play.index % this.state.segments) == play.time){
       let a = new Audio(this.props.soundUrl);
       if(segment.active && this.props.isPlaying && !this.state.mute){
         a.volume = parseFloat(this.props.effects.volume);
         a.play();
       }
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
