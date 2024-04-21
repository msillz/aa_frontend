import DataExplorer from './pages/DataExplorer';
import '@mantine/core/styles.css';
import { HeaderSimple } from './components/mantine/HeaderSimple'
import { Button, MantineProvider } from '@mantine/core';
import './css/App.css'
import { useEffect, useState } from 'react';
import Login from './login';
import Dashboard from './pages/Dashboard';
import PeerBuilder from './pages/PeerBuilder';
import './api/authentication'
import {verifyToken} from './api/authentication'

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = 'pk.eyJ1IjoibXNpbGxzIiwiYSI6ImNrNW5oZmVhaDFhbG0zbHFsbjliemE5OTcifQ.F6VIAjZwWIoPlBWpKN1kRw';


function App() {

  /* Authentication */
  const [authenticated, setAuthenticated] = useState(false);

  function setAuthValue(value){
    setAuthenticated(value);
  }

  useEffect(()=>{
    verifyToken(setAuthValue);
  }, []);

  /* Main View Handlers */
  function setCurrentTab(value){
    setCurrentView(value);
  }

  const [currentView, setCurrentView] = useState(2);
  

  return (
    <>
      <MantineProvider>
        {authenticated ? (
          <>
            <HeaderSimple logoutCallback={setAuthValue} tabCallback={setCurrentTab} currentTab={currentView}/>
            {(currentView === 0) && <Dashboard />}
            {(currentView === 1) && <PeerBuilder />}
            {(currentView === 2) && <DataExplorer />}
          </>
        ) : (
          <Login authSetter={setAuthValue}/>
        )}
      </MantineProvider>
    </>
  );
}

export default App


