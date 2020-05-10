/**
 * @Date:   2020-02-12T18:38:37+00:00
 * @Last modified time: 2020-03-11T18:30:30+00:00
 */


 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';
 import { loadAudioBuffer } from 'audiobuffer-loader';

 const fs = window.require("fs");
 const { dialog } = window.require('electron').remote;

let empty = true;


 class SoundLibrary extends Component{
   constructor(props){
     super(props);

     this.state = {
       sounds: [],
       selectedFile: "",
       fileStats: {}
     };
   }

    split = (str) => { //fastest
      return str ? str.split('\\').pop().split('/').pop() : false;
    };

   componentDidMount(){

     // console.log(this.props);
     // if(this.props.soundUrls[0] === undefined){
     //   return;
     // }else{
     //   console.log("VAlid url");
     //   let sounds = fs.readdirSync(this.props.soundUrls[0], (err, s) => {
     //     console.log(s);
     //   });
     // }
   }

   componentDidUpdate(){

     if(this.props.sounds.length !== 0 && empty){
       this.setState({selectedFile: this.props.sounds[0]}, async () => {
         empty = false;
         let stats = await loadAudioBuffer(new AudioContext(), this.state.selectedFile).then((r) => {
           return r;
         }).catch(() => { return{} });
         this.setState({fileStats: stats});
       });
     }
     if(this.props.sounds.length === 0 && !empty){
       this.setState({selectedFile: this.props.sounds[0]}, async () =>{
         empty = true;
         let stats = await loadAudioBuffer(new AudioContext(), this.state.selectedFile).then((r) => {
           return r;
         }).catch(() => { return {} });
         this.setState({fileStats: stats});
       });
     }

   }

   changeFile(name){
     let that = this;

     this.setState({selectedFile: name}, async () => {
       let st = await loadAudioBuffer(new AudioContext(), this.state.selectedFile).then((r) => {
         return r;
       });
       this.setState({fileStats: st});
     });


   };


   removeFromLibrary(e){
      if(window.confirm(`Are you Sure you want to remove: ${this.split(e)}? \nThis will Remove all Channels too.\nThisCannot be undone!`)){
        if(this.state.selectedFile === e){
          this.setState({selectedFile: null, fileStats: {}}, () => {
            this.props.removeSound(e);
            // console.log(this.state.selectedFile);
          });
        }else{
          this.props.removeSound(e);
          console.log(this.state.selectedFile);
        }
      }
   };

   importSound(){
     let file = dialog.showOpenDialogSync().then((e) => e.filePaths[0]);
     console.log(file);
   }


   preview(file){
     // console.log(this.state.selectedFile);
     if(file === "" || file === undefined)return;
     new Audio(file).play();
   }


   sizeConverter(bytes){
     return (bytes / 1024).toFixed(1) || "";
   }

   render(){
     return (
      <>
      <div className="row card-body bg-dark mb-2" style={{position: "relative", height: "calc(20vh)"}}>
        <div className="col-8 text-white">
          <h5><b>Selected File: </b> {this.split(this.state.selectedFile)} </h5>
          <h5><b>File Type: </b> {this.state.selectedFile ? this.state.selectedFile.split('.').pop() : ""} </h5>
          <h5><b>File Size: </b> {this.state.fileStats.fileSize ? this.sizeConverter(this.state.fileStats.fileSize) : 0} KB </h5>
          <h5><b>Duration: </b> {this.state.fileStats.audioBuffer ? this.state.fileStats.audioBuffer.duration.toFixed(3) : 0} Seconds </h5>

        </div>
        <div className="col-4" style={{position: "relative"}}>
          <button className={(this.state.selectedFile ? "btn-primary" : "btn-secondary") + " mb-2"} disabled={this.state.selectedFile === "" || this.state.selectedFile === undefined} onClick={() => this.preview(this.state.selectedFile)}>Preview</button>
          <button className={(this.state.selectedFile ? "btn-primary" : "btn-secondary")} disabled={this.state.selectedFile === "" || this.state.selectedFile === undefined} onClick={() => this.props.addChannel(this.state.selectedFile)}>Add Channel</button>
          <button className={(this.state.selectedFile ? "btn-primary" : "btn-secondary")} disabled={this.state.selectedFile === "" || this.state.selectedFile === undefined} onClick={() => this.props.changeSound(this.state.selectedFile)}>Change Sound</button>
          {this.state.selectedFile ? <button className="btn-danger" style={{position: "absolute", bottom: 0, left: "15px"}} onClick={() => this.removeFromLibrary(this.state.selectedFile)}>Remove</button> : <></>}
        </div>
      </div>
      {/* Fix later either to set minnimum screen size or fix al together*/}
      <div className="row card-body bg-dark" style={{position: "relative"}}>
        <div className="col-12 p-0">
          <ul className="list-group" style={{height: "calc(61vh)"}}>
            {/*<li className="list-group-item list-group-item-action">SoundFile1<button className="btn btn-danger float-right">X</button></li>*/}
            {this.props.sounds.length === 0 ? <p className="text-white">You have no sounds in your library</p> : this.props.sounds.map((e, i) => {
              return (
                <li key={i} className="list-group-item list-group-item-action pointer">
                  <span className="pointer" onClick={() => this.changeFile(e)}>{this.split(e)}</span>
                  <button className="btn btn-danger float-right" onClick={() => this.removeFromLibrary(e)}>X</button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-12 bg-dark" style={{position: "absolute", bottom: 0, right: "0px"}}>
          <button className="btn btn-primary float-right mb-3" onClick={() => this.props.importSound()}>Import</button>
        </div>
      </div>
      </>
     );
   }
 }



//  var substringTest = function (str) {
//     return str.substring(str.lastIndexOf('/')+1);
// }
//
// var replaceTest = function (str) {
//     return str.replace(/^.*(\\|\/|\:)/, '');
// }
//
// var execTest = function (str) {
//     return /([^\\]+)$/.exec(str)[1];
// }
//
// var splitTest = function (str) { //fastest
//     return str.split('\\').pop().split('/').pop();
// }

 let debugStyle = {
   border: "solid 1px red"
 };

 function debugBorder(color = "red", size = "1px", type = "solid"){
   return {border: size +" "+ type +" " + color};
 }

 export default SoundLibrary;
