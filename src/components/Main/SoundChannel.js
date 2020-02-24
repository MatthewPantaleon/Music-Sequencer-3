/**
 * @Date:   2020-02-24T08:59:30+00:00
 * @Last modified time: 2020-02-24T11:23:25+00:00
 */

 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';

 class SoundChannel extends Component{
   constructor(props){
     super(props);
     this.state = {
       barInterval: 4,
       segments: 28,
       bar: []
     };
   }

   componentDidMount(){
     let segments = [];
     for(let i = 0; i < this.state.segments; i++){
       let backgroundColor = "#777";

       if((i+1) % this.state.barInterval === 0)backgroundColor = "#444";
       segments.push(
         <>
          <div className="mr-1" onClick={() => this.doSomething(this.props.id, i)} style={segment(undefined,backgroundColor)}> </div>
         </>);
     }
     this.setState({bar: segments});
   }

   doSomething(id, i){
     console.log("This is something from channel: "+ id + ". Position: " + (i+1));
   }


   render(){
     return(
       <>

       <div className="col-12">
        <div className="row mb-1" >
          <div className="col-1">
            <button className="btn btn-secondary">Name</button>
          </div>
          <div className="col-11">
            {this.state.bar}
          </div>
        </div>
       </div>
       </>
     );
   }
 }

 function segment(size = "2vw", backgroundColor = "#777"){
   return{width: size, height: size, backgroundColor, display: "inline-block"};
 }

 function debugBorder(color = "red", size = "1px", type = "solid"){
   return {border: size +" "+ type +" " + color};
 }

 export default SoundChannel;
