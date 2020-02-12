/**
 * @Date:   2020-02-12T18:38:37+00:00
 * @Last modified time: 2020-02-12T18:40:46+00:00
 */


 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';

 const fs = window.require("fs");

 class SoundLibrary extends Component{
   constructor(props){
     super(props);

     this.state = {

     };
   }

   render(){
     return (
       <p>This is the Sound Library</p>
     );
   }
 }

 export default SoundLibrary;
