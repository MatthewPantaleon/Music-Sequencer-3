/**
 * @Date:   2020-02-12T18:45:22+00:00
 * @Last modified time: 2020-02-12T18:46:35+00:00
 */

 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import 'bootstrap/dist/css/bootstrap.css';

 const fs = window.require("fs");

 class SoundAPI extends Component{
   constructor(props){
     super(props);

     this.state = {

     };
   }

   render(){
     return (
       <p>This is the Sound API BROWSER</p>
     );
   }
 }

 export default SoundAPI;
