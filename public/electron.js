/**
 * @Date:   2020-01-03T02:49:14+00:00
 * @Last modified time: 2020-02-12T16:13:28+00:00
 */
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const electronOauth2 = require('electron-oauth2');

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});



let config = {
    clientId: '9pNXD48E3KzL8dcoUgcG',
    clientSecret: 'BBnYUCYDJYwYpPgw0JsEDeR6ICVfopgqvE7gidtn',
    authorizationUrl: 'https://freesound.org/apiv2/oauth2/authorize/',
    tokenUrl: 'TOKEN_URL',
    useBasicAuthorizationHeader: false,
    redirectUri: "https://freesound.org/home/app_permissions/permission_granted/"
};

function currentURL(e){
  if(e){
    console.log("Development");
    return "http://localhost:3000";
  }else{
    return `file://${path.join(__dirname, "../build/index.html")}`;
  }
}


function createWindow() {
  mainWindow = new BrowserWindow({ width: 1366, height: 768, webPreferences: { nodeIntegration: true }});
  // mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
  // mainWindow.loadURL(
  //   isDev
  //     ? "http://localhost:3000"
  //     : `file://${path.join(__dirname, "../build/index.html")}`
  // );
  mainWindow.loadURL(currentURL(isDev));
  mainWindow.on("closed", () => (mainWindow = null));

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
