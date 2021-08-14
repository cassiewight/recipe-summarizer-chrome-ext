/* global chrome */
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import './App.css';
import Main from './components/Main';
import ApiKeyForm from './components/ApiKeyForm';
import PdfMaker from './components/PdfMaker';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Fab } from '@material-ui/core';


function App() {

  //dev mode bypasses all the chrome functionality
  const devMode = false;
  const pdfTesting = true;
  const sampleRecipe = 'https://www.sallysbakingaddiction.com/homemade-artisan-bread/';

  const [url, setUrl] = useState('');
  const [apikey, setApikey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const changeApiKey = (key) => {

    if(!devMode){
      //check if key has changed

      // save key in chrome storage.
      chrome.storage.sync.set({'spoonApiKey': key}, function() {
      console.log('Value is set to ' + key);
      
      });
    }
    
    setApikey(key);

  }

const toggleSettings = () => {
  showSettings == true ? setShowSettings(false) : setShowSettings(true);
}

  useEffect(() => {

    if(!devMode){
      //get url
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        setUrl(tabs[0].url);
      });
  
      //get apiKey from storage
      if(apikey == ''){
        chrome.storage.sync.get('spoonApiKey', function(data) {
            if (typeof data.spoonApiKey === 'undefined') {
              console.log('no api key');
            } else {
              console.log('api key is: ' + data.spoonApiKey);
              setApikey(data.spoonApiKey);
            }
          });
        }
    }
    else {
      if(apikey == ''){
        setApikey('82cdfabf5a544ab8b4fc2a377f5fcde3');
        setUrl(sampleRecipe);
        //setUrl('google.com');
        //console.log('App.js useEffect fired');
      }
    }    

  },[url]);

  if(pdfTesting){
    return(
      <PdfMaker text={url}/>
    );
  }

  //On initial load, either render the api key form if no chrome apikey is set, or the main form
  if(apikey != ''){
    //return the main and the settings page, which can be togggled from the main page
    return (
      <div style={{height:'800px'}}>
        {!showSettings ? 
        <Main url={url} apikey={apikey} setApikey={changeApiKey}/> : 
        <ApiKeyForm apikey={apikey} setApikey={changeApiKey} welcome={false}/>
        }
        <Fab color="grey" style={{position:'fixed', bottom:'5px', right:'5px'}}>
        <IconButton 
          aria-label="settings"
          onClick = {toggleSettings}>
            {!showSettings ? <SettingsIcon /> : <ArrowBackIcon/>}
          </IconButton>
        </Fab>
      </div>
    );
  }

  else{
    return (
      <ApiKeyForm setApikey={changeApiKey} welcome={true}/>
    );
  }
  
}

export default App;
