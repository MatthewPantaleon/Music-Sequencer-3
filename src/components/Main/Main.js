/**
 * @Date:   2020-01-17T16:13:59+00:00
 * @Last modified time: 2020-01-17T18:47:23+00:00
 */


 import React, { Component, Fragment } from 'react';
 import $ from "jquery";


let baseStyle = {
  border: "1px solid red"
};

 class Main extends Component{
   constructor(props){
     super(props);
     this.state = {

     };
   }

   render(){
     return(
       <>
        <p>Main</p>
        <div className="contriner-fluid">
          <div className="row">
            <ReadySounds />
            <Timeline />

            <hr className="col-12 m-0" style={{border: "1px solid grey"}}/>

            <FileManager />
            <SoundArea />
          </div>
        </div>

       </>
     );
   }

 }

//-------------------------------------------
class ReadySounds extends Component{
  render(){
    return(
      <>
        <div className="col-3" style={baseStyle}>

            <p>oehn</p>

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

  clicked(e){
    
  }

  render(){
    return(
      <>
        <div className="col-5" style={baseStyle} onClick={(e) => this.clicked(e)}>
            <p>oehn</p>
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
