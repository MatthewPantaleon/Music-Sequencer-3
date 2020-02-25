/**
 * @Date:   2020-01-17T16:13:59+00:00
 * @Last modified time: 2020-02-25T18:43:53+00:00
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
     this.state = {
       directory: "C:/Users/N00173936/Desktop/DummyFolder/projects/",
       selectedFile: {name: "", stats: []},
       readyFiles: [],
       soundChannels: [],
       projectData: {}
     };
     // console.log(this.state.directory);
   }
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
     console.log("Add New Channel: " + fileName);
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

//-----------------------------------------------------------------------------------
   newProject(){
     console.log("NEW PROJECT");
     alert("This is an Alert!");
     window.confirm("Are you sure?");
   }

   saveProject(){
     console.log("Save Project");
     let data = JSON.stringify(this.state.projectData);
     console.log(data);
     fs.writeFileSync(this.state.directory + "readme_2.json", data);
   }

   loadProject(){
     console.log("Load Project");
     let rawData = {};
     rawData = fs.readFileSync(this.state.directory + "readme.json");


     let jsonData = JSON.parse(rawData);
     console.log(jsonData);
     this.setState({soundDirectory: jsonData.projectDirectory + "/sounds", projectData: jsonData}, () => {
       console.log(this.state.soundDirectory);
       let results = fs.readdirSync(this.state.soundDirectory).filter((e, i) => {
         return e.includes(".mp3") || e.includes(".wav") ;
       });
       this.setState({readyFiles: results});
     });
   }
//-----------------------------------------------------------------------------------

  importSoundFromMain = async () => {
    let file = await dialog.showOpenDialog(BrowserWindow).then((e) => e.filePaths[0]);
    if(!file)return;
    console.log(file);

    if(file.includes(".wav") || file.includes(".mp3")){
      let newArray = this.state.readyFiles;
      newArray.push(file);
      this.setState({readyFiles: newArray}, () => console.log(this.state.readyFiles));
    }else{
      alert("That is not a sound File!");
    }
  };

  removeFromProject = (name) => {
    // console.log(name);
    let newArray = this.state.readyFiles;
    newArray = newArray.filter(e => e !== name);
    console.log(newArray);
    this.setState({readyFiles: newArray});
  };




   render(){
     return(
       <>
          <div className="no-gutters p-0 m-0 container-fluid" style={{overflowX: "hidden", overflowY: "hidden", width: "100%"}}>
            <div className="card-header bg-dark text-white p-0">


            <DropdownButton title="File" variant="dark" size="sm">
              <Dropdown.Item href="#" onClick={() => this.newProject()}>New Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.saveProject()}>Save Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.loadProject()}>Load Project</Dropdown.Item>
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

export default Main;
