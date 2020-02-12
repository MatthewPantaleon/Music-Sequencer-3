/**
 * @Date:   2020-01-17T16:13:59+00:00
 * @Last modified time: 2020-02-12T20:00:19+00:00
 */


import React, { Component, Fragment } from 'react';
import $ from "jquery";
import SoundBrowser from './SoundBrowser';
import SoundContainer from './SoundContainer';
import { Dropdown, DropdownButton } from 'react-bootstrap';


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
       readyFiles: [],
       test: {}
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

   newProject(){
     console.log("NEW PROJECT");
     alert("This is an Alert!");
     window.confirm("Are you sure?");
   }

   saveProject(){
     console.log("Save Project");
     let data = JSON.stringify(this.state.test);
     console.log(data);
     fs.writeFileSync("C:/Users/N00173936/Desktop/DummyFolder/projects/readme_2.json", data);
   }

   loadProject(){
     console.log("Load Project");
     let rawData = fs.readFileSync("C:/Users/N00173936/Desktop/DummyFolder/projects/readme.json");
     let jsonData = JSON.parse(rawData);
     // console.log(jsonData);
     this.setState({test: jsonData}, () => console.log(this.state.test));
   }

   render(){
     return(
       <>
          <div className="no-gutters p-0 m-0 container-fluid" style={{overflowX: "hidden", overflowY: "hidden"}}>
            <div className="card-header bg-dark text-white p-0">


            <DropdownButton title="File" variant="dark" size="sm">
              <Dropdown.Item href="#" onClick={() => this.newProject()}>New Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.saveProject()}>Save Project</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => this.loadProject()}>Load Project</Dropdown.Item>
            </DropdownButton>



            </div>
            <div className="row p-0">
            <div className="col-3 p-0" style={{height: "calc(100vh - 50px)"}}>
              <SoundBrowser />
            </div>

            <div className="col-9">
              <SoundContainer />
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
