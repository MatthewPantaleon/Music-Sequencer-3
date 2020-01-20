/**
 * @Date:   2020-01-17T16:13:59+00:00
 * @Last modified time: 2020-01-20T20:12:02+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
const fs = window.require("fs");

let baseStyle = {
  border: "1px solid red"
};

const isObjectEmpty = (obj) => {
  // console.log(obj);
  return obj.name === "" && obj.constructor === Object && obj.stats.length === 0;
}

 class Main extends Component{
   constructor(props){
     super(props);
     this.state = {
       directory: "C:/Users/N00173936/Desktop/DummyFolder",
       selectedFile: {name: "", stats: []},
       readyFiles: []
     };
     // console.log(this.state.directory);
   }

   giveReadyFiles = function(e){
     console.log(this.state.directory);
     let temp = this.state.readyFiles;
      if(!isObjectEmpty(e)){
        temp.push(e);
        this.setState({readyFiles: temp});
      }
   }.bind(this);

   render(){
     return(
       <>
        <p>Main</p>
        <div className="container-fluid">
          <div className="row">
            <ReadySounds files={this.state.readyFiles}/>
            <Timeline />

            <hr className="col-12" style={{border: "1px solid black", margin: 0}}/>

            <FileManager give={this.giveReadyFiles} dir={this.state.directory}/>
            <SoundArea />
          </div>
        </div>

       </>
     );
   }

 }

//-------------------------------------------
class ReadySounds extends Component{

  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <>
        <div className="col-3" style={baseStyle}>

            <p>oehn</p>
            <ul>
              {this.props.files.map((e, i) => {
                return(<li key={i}>{e.name}</li>);
              })}
            </ul>

        </div>
      </>
    );
  }
}
//-------------------------------------------
class Timeline extends Component{
  render(){
    return(
      <>
        <div className="col-9" style={baseStyle}>
            <p>oehn</p>
        </div>
      </>
    );
  }
}
//-------------------------------------------
class FileManager extends Component{

  constructor(props){
    super(props);
    this.state = {
      files: [],
      selectedFile: {name: "", stats: []}
    };
  }

  ////////////////////////////////////////////////////////////
  getFiles(){
    let temp = [];
    fs.readdir(this.props.dir, (err, files) => {
      console.log(files);
      files.forEach((e, i) => {
        try{
          const data = fs.statSync(this.props.dir + "/" + e);
          temp.push({
            name: e,
            stats: data
          });
        }catch(err){
          console.log("ESKET");
        }
        this.setState({files: temp});
      });
    });

  }
  ////////////////////////////////////////////////////////////

  componentDidMount(){
    this.getFiles();
  }


  selectedFile(e){
    // console.log(e);
    this.setState({selectedFile: e});
  }


  render(){
    return(
      <>
        <div className="col-5" style={baseStyle}>
            <p>List of Files</p>
            <p>Slected File: {this.state.selectedFile.name}</p>
            <button onClick={() => this.props.give(this.state.selectedFile)}>Import</button>
            <button>Edit</button>
            <ul>
                {this.state.files.map((e, i) => {
                  return (<li key={i} onClick={() => this.selectedFile(e)}>{e.name}</li>);
                })}
            </ul>
        </div>
      </>
    );
  }
}
//-------------------------------------------
class SoundArea extends Component{
  render(){
    return(
      <>
        <div className="col-7" style={baseStyle}>
            <p>oehn</p>
        </div>
      </>
    );
  }
}

export default Main;
