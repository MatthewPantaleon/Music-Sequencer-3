/**
 * @Date:   2020-02-05T15:09:26+00:00
 * @Last modified time: 2020-02-24T19:13:42+00:00
 */

import React, { Component, Fragment } from 'react';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';

import SoundLibrary from './SoundLibrary';
import SoundAPI from './SoundAPI';

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
      isLibrary: true,

    };


  }

  componentDidMount(){
    
  }

  switchLibrary(location){
    switch(location){
      case "library":
        this.setState({isLibrary: true});
        break;
      case "API":
        this.setState({isLibrary: false});
        break;
      default:
        let e = {message: "How did you even get Here?"}
        throw e.message;
        break;
    }
  }

  render(){
    return(
      <>
        <div className="card">
          <div className="card-header bg-dark text-white">
            <button className={"mr-3 " + (this.state.isLibrary ? "btn btn-primary" : "btn btn-secondary")} onClick={() => this.switchLibrary("library")}>Sound Library</button>
            <button className={(this.state.isLibrary ? "btn btn-secondary" : "btn btn-primary")} onClick={() => this.switchLibrary("API")}>Sound Browser</button>
          </div>

          <div className="card-body bg-secondary" style={{height: "calc(100vh - 120px)"}}>
            {this.state.isLibrary ? <SoundLibrary sounds={this.props.sounds} importSound={this.props.importSound}/> : <SoundAPI />}
          </div>
          <hr className="m-0"/>
        </div>
      </>
    );
  }
}


export default SoundBrowser;
