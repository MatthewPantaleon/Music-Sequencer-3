/**
 * @Date:   2020-02-12T18:38:37+00:00
 * @Last modified time: 2020-02-24T11:36:10+00:00
 */


 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';

 const fs = window.require("fs");

 class SoundLibrary extends Component{
   constructor(props){
     super(props);

     this.state = {
       sounds: [],
       selectedFile: "" || "Name"
     };
   }

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

   changeFile = (name) => {
     this.setState({selectedFile: name});
   };

   removeFromLibrary(e){
     console.log("Remove: " + e);
   };


   render(){
     return (
      <>
      <div className="row card-body bg-dark mb-2" style={{position: "relative", height: "calc(20vh)"}}>
        <div className="col-8 text-white">
          <h5><b>Selected File: </b> {this.state.selectedFile} </h5>
          <h5><b>File Type: </b> WAV </h5>
          <h5><b>File Size: </b> 100kb </h5>

        </div>
        <div className="col-4" style={{position: "relative"}}>
          <button className="btn-primary mb-2">Preview</button>
          <button className="btn-secondary" disabled={this.props.sounds.length == 0} onClick={() => console.log("Adding Channel: ", this.props)}>Add Channel</button>
          <button className="btn-danger" style={{position: "absolute", bottom: 0, left: "15px"}}>Remove</button>
        </div>
      </div>
      {/* Fix later either to set minnimum screen size or fix al together*/}
      <div className="row card-body bg-dark" style={{position: "relative"}}>
        <div className="col-12 p-0">
          <ul className="list-group" style={{height: "calc(60vh)"}}>
            {/*<li className="list-group-item list-group-item-action">SoundFile1<button className="btn btn-danger float-right">X</button></li>*/}
            {this.props.sounds.length === 0 ? <p className="text-white">You have no sounds in your library</p> : this.props.sounds.map((e, i) => {
              return (
                <li key={i} className="list-group-item list-group-item-action" onClick={() => this.changeFile(e)}>{e}<button className="btn btn-danger float-right" onClick={() => this.removeFromLibrary(e)}>X</button></li>
              );
            })}
          </ul>
        </div>

        <div className="col-12 bg-dark" style={{position: "absolute", bottom: 0, right: "0px"}}>
          <button className="btn btn-primary float-right mb-3">Import</button>
        </div>
      </div>
      </>
     );
   }
 }

 let debugStyle = {
   border: "solid 1px red"
 };

 function debugBorder(color = "red", size = "1px", type = "solid"){
   return {border: size +" "+ type +" " + color};
 }

 export default SoundLibrary;
