/**
 * @Date:   2020-01-17T16:13:59+00:00
 * @Last modified time: 2020-02-28T18:27:56+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
import SoundBrowser from './SoundBrowser';
import SoundContainer from './SoundContainer';
import { Dropdown, DropdownButton } from 'react-bootstrap';


const fs = window.require("fs");
const { dialog } = window.require('electron').remote;
const { BrowserWindow } = window.require('electron');

let baseStyle = {
  border: "1px solid red"
};

const isObjectEmpty = (obj) => {
  // console.log(obj);
  return obj.name === "" && obj.constructor === Object && obj.stats.length === 0;
}


const testUrl = "C:/Users/N00173936/Desktop/DummyFolder/projects/";

 class Main extends Component{
   constructor(props){
     super(props);
     this.newBlank = {
       directory: "C:/Users/N00173936/Desktop/DummyFolder/projects/",
       selectedFile: "",
       readyFiles: [],
       soundChannels: [],
       channelBars: [],
       effectBars: [],
       bpm: 120,
       projectName: "untitled",
       context: new AudioContext()
     };

     this.state = this.newBlank;
     this.selectedChannel = -1;
     // console.log(this.state.directory);
   }



   split = (str) => { //fastest
     if(!str)return;
     return str ? str.split('\\').pop().split('/').pop() : false;
   };
//-----------------------------------------------------------------------------------
   giveReadyFiles = function(e){
      console.log(this.state.directory);
      let temp = this.state.readyFiles;
      if(!isObjectEmpty(e)){
        temp.push(e);
        this.setState({readyFiles: temp});
      }
   }.bind(this);

   addNewChannel = (fileName) => {
     // console.log("Add New Channel: " + fileName);
     let newArray = this.state.soundChannels;
     newArray.push(fileName);
     this.setState({soundChannels: newArray});
   };

   clearAllChannels = () => {
     if(window.confirm("Clear All Channels? This action cannot be Undone!")){
       this.setState({soundChannels: []}, () => alert("Cleared All Channels"));
     }
   };

   saveProjectData = (attribute) => {
     console.log("Save Part of a project!");
   };

   changeBpm = (bpm) => {
     this.setState({bpm});
   };

   changeChannelVolume = (id) => {

   };

   getChannelBarData = (e) => {
     let newArray = this.state.channelBars;
     let effectArray = this.state.effectBars;
     newArray.push(e);
     effectArray.push({id: e[0].id, volume: 1});
     this.setState({channelBars: newArray, effectBars: effectArray}, () => console.log(this.state));
   };

//-----------------------------------------------------------------------------------
   newProject(){
     if(!window.confirm("Are you sure? All unsaved Progress will be lost!"))return;
     this.setState({
       directory: "C:/Users/N00173936/Desktop/DummyFolder/projects/",
       selectedFile: "",
       readyFiles: [],
       soundChannels: [],
       channelBars: [],
       effectbars: [],
       projectName: "untitled",
       context: new AudioContext()
     });
   }

   async saveProject(){
     let data = JSON.stringify(this.state);
     let saveUrl = await dialog.showSaveDialog(BrowserWindow, {defaultPath: this.state.projectName + ".json"}).then(e => e.filePath);

     if(saveUrl)fs.writeFileSync(saveUrl, data);
     // console.log(saveUrl);
   }

   async loadProject(){
     // console.log("Load Project");
     if(this.state.soundChannels.length > 0){
       if(!window.confirm("All progress will be lost! Are you Sure to Load?")){
         return;
       }
     }
     let rawData = {};
     let loadDIr = await dialog.showOpenDialog(BrowserWindow).then((e) => e.filePaths[0]);
     rawData = fs.readFileSync(loadDIr);
     let jsonData = JSON.parse(rawData);

     // console.log(jsonData);
     // this.setState({soundDirectory: jsonData.projectDirectory + "/sounds", projectData: jsonData}, () => {
     //   console.log(this.state.soundDirectory);
     //   let results = fs.readdirSync(this.state.soundDirectory).filter((e, i) => {
     //     return e.includes(".mp3") || e.includes(".wav");
     //   });
     //   this.setState({readyFiles: results});
     // });
     this.setState({
       directory: "C:/Users/N00173936/Desktop/DummyFolder/projects/",
       selectedFile: "",
       readyFiles: [],
       soundChannels: [],
       channelBars: [],
       projectName: "untitled"
     }, () => this.setState(jsonData));
   }
//-----------------------------------------------------------------------------------

  importSoundFromMain = async () => {
    let file = await dialog.showOpenDialog(BrowserWindow).then((e) => e.filePaths[0]);
    if(!file)return;
    // console.log(file);

    if(file.includes(".wav") || file.includes(".mp3")){
      // console.log(fs.createReadStream(file));
      let newArray = this.state.readyFiles;
      newArray.push(file);
      this.setState({readyFiles: newArray});
    }else{
      alert("That is not a sound File!");
    }
  };

  removeFromProject = (name) => {
    // console.log(name);

    let newArray = this.state.readyFiles;
    let newChannels = this.state.soundChannels;
    newArray = newArray.filter(e => e !== name);
    newChannels = newChannels.filter(e => e !== name);
    console.log(newArray);
    this.setState({readyFiles: newArray, soundChannels: newChannels});

  };

  removeChannel = (index) => {
    // console.log(index - 1);
    let newArray = this.state.soundChannels;
    let newChannels = this.state.channelBars;
    let effectArray = this.state.effectBars;
    // console.log(newArray);
    newArray[index - 1] = undefined;
    newChannels[index - 1] = undefined;
    effectArray[index - 1] = undefined;

    if(newArray.every((e) => e === undefined)){
      this.setState({soundChannels: [], channelBars: [], effectBars: []});
    }else{
      // newArray = newArray.filter(e => e !== undefined);
      // newChannels = newChannels.filter(e => e !== undefined);
      this.setState({soundChannels: newArray, channelBars: newChannels, effectBars: effectArray});
    }

  };
//-----------------------------------------------------------------------------------
  saveToReal(){
    console.log("SAVE TO REAL SOUND");
  }



   render(){
     return(
       <>
          <div className="no-gutters p-0 m-0 container-fluid" style={{overflowX: "hidden", overflowY: "hidden", width: "100%"}}>
            <div className="card-header bg-dark text-white p-0">


            <DropdownButton title="File" variant="dark" size="sm">
              <Dropdown.Item href="#" onClick={() => this.newProject()}>New Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.saveProject()}>Save Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.loadProject()}>Load Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.saveToReal()}>Export As File...</Dropdown.Item>
            </DropdownButton>



            </div>
            <div className="row p-0">
            <div className="col-3 p-0" style={{height: "calc(100vh - 50px)"}}>
              <SoundBrowser
                sounds={this.state.readyFiles}
                importSound={this.importSoundFromMain}
                removeSound={this.removeFromProject}
                addChannel={this.addNewChannel}
              />
            </div>

            <div className="col-9">
              <SoundContainer
                soundChannels={this.state.soundChannels}
                clearChannels={this.clearAllChannels}
                removeChannel={this.removeChannel}
                getBarData={this.getChannelBarData}
                existingBars={this.state.channelBars}
                bpm={this.state.bpm}
                changeBpm={this.changeBpm}

                AudioContext={this.state.context}
              />
            </div>
            </div>
          </div>
       </>
     );
   }
 }

 let border = {
   border: "1px solid red"
 };

 // fs.readdir(this.props.dir, (err, files) => {
 //   console.log(files);
 //   files.forEach((e, i) => {
 //     try{
 //       const data = fs.statSync(this.props.dir + "/" + e);
 //       temp.push({
 //         name: e,
 //         stats: data
 //       });
 //     }catch(err){
 //       console.log("ESKET");
 //     }
 //     this.setState({files: temp});
 //   });
 // });


//-------------------------------------------
// class FileManager extends Component{
//
//   constructor(props){
//     super(props);
//     this.state = {
//       files: [],
//       selectedFile: {name: "", stats: []}
//     };
//   }
//
//   ////////////////////////////////////////////////////////////
//   getFiles(){
//     let temp = [];
//   }
//   ////////////////////////////////////////////////////////////
//
//   componentDidMount(){
//     this.getFiles();
//   }
//
//
//   selectedFile(e){
//     // console.log(e);
//     this.setState({selectedFile: e});
//   }
//
//   render(){
//     return(
//       <>
//         <div className="col-5" style={baseStyle}>
//             <p>List of Files</p>
//             <p>Slected File: {this.state.selectedFile.name}</p>
//             <button onClick={() => this.props.give(this.state.selectedFile)}>Import</button>
//             <button>Edit</button>
//             <ul>
//                 {this.state.files.map((e, i) => {
//                   return (<li key={i} onClick={() => this.selectedFile(e)}>{e.name}</li>);
//                 })}
//             </ul>
//         </div>
//       </>
//     );
//   }
// }

export default Main;
