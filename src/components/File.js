/**
 * @Date:   2020-01-15T18:34:44+00:00
 * @Last modified time: 2020-01-16T13:16:51+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";

import 'bootstrap/dist/css/bootstrap.css';


const fs = window.require("fs");


let testDir = "C:/Users/N00173936/Desktop/TestingFolder";

let backgroundColor = {
  backgroundColor: "#eee"
};

class FileCall extends Component{

  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }

  previewSound(e){
    // console.log(e.name);
    let soundDir = "C:/Users/N00173936/Desktop/TestingFolder/" + e.name;

    try{
      new Audio(soundDir).play();
      console.log("HOO RAY");
    }catch(err){
      console.log("RERERERREEEEE");
      throw err;
    }
  }

  getFiles(){
    console.log("Retrieving Files...");
    let temp = [];

    fs.readdir(testDir, (err, files) => {
      console.log(files);
      files.forEach((e, i) => {
        try{
          const data = fs.statSync(testDir + "/" + e);
          temp.push({
            name: e,
            stats: data
          });
        }catch(err){
          console.log("ESKET");
        }
      });

      this.setState({files: temp});
    });
  }


  render(){
    return(
      <Fragment>
        <div className="col-12" style={backgroundColor}>
          Sound Files:
          <button onClick={() => {this.getFiles()}}>Get Files</button>
          <ul>
            {this.state.files.map((e, i) => {
              return(
                <li key={i}>{e.name} | {e.stats.size}bytes | <button onClick={() => {this.previewSound(e)}}>Preview</button></li>
              );
            })}
          </ul>
        </div>
      </Fragment>
    );
  }
}


export default FileCall;
