/**
 * @Date:   2020-01-15T19:29:26+00:00
 * @Last modified time: 2020-01-16T10:20:36+00:00
 */



 import React, { Component, Fragment } from 'react';
 import $ from "jquery";

 import 'bootstrap/dist/css/bootstrap.css';

 class SoundAPI extends Component{
   constructor(props){
     super(props);

     this.state = {
       searchTerm: "",
       searchResults: [],
       currentResult: {},
       nextURL: "",
       previousURL: "",
       files: []
     };
   }

   callAPI(){

   }

   apiRequest(e){
     e.preventDefault();
     console.log(this.state.searchTerm);
   }

   componentDidMount(){
     // window.location.href = "https://freesound.org/apiv2/oauth2/authorize/";
   }

   render(){
     return(
       <>
       <div className="col-12">
         Search API:
         <form onSubmit={(e) => { this.apiRequest(e) }}>
           <label>Search:</label>
           <input type="text" onChange={(e) => {this.setState({searchTerm: e.target.value})}}/>
           <input type="text" onChange={(e) => {this.setState({searchTerm: e.target.value})}}/>
           <button type="submit">Search</button>
         </form>

       </div>
       </>
     );
   }
 }


export default SoundAPI;
