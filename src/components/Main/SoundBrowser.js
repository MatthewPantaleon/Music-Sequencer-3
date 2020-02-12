/**
 * @Date:   2020-02-05T15:09:26+00:00
 * @Last modified time: 2020-02-12T14:38:19+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';

const fs = window.require("fs");

const electron = window.require('electron');
const {screen, BrowserWindow} = window.require('electron');
const remote = electron.remote;
// console.log(screen.getPrimaryDisplay());

console.log(remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds());
let space = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds();


class SoundBrowser extends Component{

  constructor(props){
    super(props);

    this.state = {

    };


  }

  render(){
    return(
      <>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <button className="btn btn-primary mr-3">Sound Library</button>
            <button className="btn btn-secondary">Sound Browser</button>
          </div>

          <div className="card-body bg-secondary" style={{height: "calc(100vh - 120px)"}}>
            rwthht
          </div>
          <hr className="m-0"/>
        </div>
      </>
    );
  }
}

let h = {
  tooltip: {
    height: 200
  },
  browser: {
    height: space.height - 210 + space.y
  }
};

export default SoundBrowser;
