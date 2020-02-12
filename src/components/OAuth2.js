/**
 * @Date:   2020-01-22T15:09:47+00:00
 * @Last modified time: 2020-01-22T15:27:59+00:00
 */

 import React, { Component, Fragment } from 'react';
 import $ from "jquery";
 import { OauthSender } from 'react-oauth-flow';


class OAuth2 extends Component{


  handleEvent(e, message){
    console.log(message);
  }

  render(){
    return(
      <>
        <OauthSender
        authorizeUrl="https://www.dropbox.com/oauth2/authorize"
        clientId="9pNXD48E3KzL8dcoUgcG"
        redirectUri="https://freesound.org/home/app_permissions/permission_granted/"
        onAuthSuccess={(e) => this.handleEvent(e, "WOO")}
        onAuthError={(e) => this.handleEvent(e, "AWWW MAN")}
        render={({ url }) => <button href={url}>Connect to freesound</button>}
        />
      </>
    );
  }
}

export default OAuth2;
