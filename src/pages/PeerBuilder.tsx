import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ScrollArea, Tooltip, MultiSelect, Select } from '@mantine/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InstitutionalSelectionPanel from "../components/InstitutionalSelectionPanel";
import DataElementList from "../controllers/dataElementControllers";
import DataSelectionModal from '../controllers/DataSelectionModal';
import { css } from '@emotion/css';
import { useState, useEffect, useRef } from 'react';
import { IconSettingsFilled, IconSend2, IconDeviceFloppy, IconFileUpload } from '@tabler/icons-react';
import mapboxgl from 'mapbox-gl';
import { Popup } from 'mapbox-gl';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Fab } from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';


export default function PeerBuilder() {

  const mainGridStyle = css`
    padding-top: 4rem;
    display: grid;
    grid-template-columns: 34rem 1fr;
    gap: 1rem;
    height: 100vh;
    max-height: 100vh;
  `

  const componentListStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: "1 / 2";
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 1rem;
    align-items: center;
    height: 100%;
    overflow: hidden;
  `

  // Tab State Variables
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const tabHeaderStyles = css`
    div[role="tablist"]{justify-content: space-between;}
    button[tabindex]{flex: 1;}
  `;

  // Query State Variables
  const [states, setStates] = useState<string[]>([]);


  // MAPBOX STUFF
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const el = document.createElement('div');
  el.className = 'my-marker-class';
  // el.style.backgroundImage = 'url(https://example.com/my-marker-icon.png)';
  el.style.width = '2rem';
  el.style.height = '2rem';
  el.style.backgroundSize = '100%';
  el.style.backgroundColor = 'red';

  useEffect(() => {

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/msills/cluz7h1vs006301pp61p5grqg',
      center: [lng, lat],
      zoom: zoom,
    });

  });

  function test() {

    const popUp = new Popup({ closeButton: false, anchor: 'left', })
      .setHTML(`<div class="popup">You click here: <br/>[${lng},  ${lat}]</div>`)

    new mapboxgl.Marker({ 'color': 'red' })
      .setLngLat([-74.5, 40])
      .setPopup(popUp)
      .addTo(map.current);
  }

  return (
    <>
      <div className={mainGridStyle}>

        {/* Component List */}
        <div className={componentListStyle}>

          <div className={
            css`width: 100%; display: flex; flex-direction: column; gap: 1.5rem;`
          }>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList className={tabHeaderStyles} onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Geographic" value="1" />
                  <Tab label="Financial" value="2" />
                  <Tab label="Similarity" value="3" />
                </TabList>
              </Box>

              {/* Geographic Filters */}
              <TabPanel value="1" className={css`padding: 0 !important;`}>
                <h3 className={css`margin: 0;`}>States</h3>
                <MultiSelect label="" placeholder="Pick value" data={['React', 'Angular', 'Vue']} value={states} onChange={setStates} />
                <h3 className={css`margin: 0; margin-top: 1.5rem;`}>CBSA Regions</h3>
                <MultiSelect label="" placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} />
                <h3 className={css`margin: 0; margin-top: 1.5rem;`}>Counties</h3>
                <MultiSelect label="" placeholder="Pick value" data={['React', 'Angular', 'Vue', 'Svelte']} />
                <h3 className={css`margin: 0; margin-top: 1.5rem;`}>Select Individual Institutions</h3>
                <Select label="" placeholder="Use limit to optimize performance" limit={5} data={[]} searchable />
                <h3 className={css`margin: 0; margin-top: 1.5rem;`}>Exclude Individual Institutions</h3>
                <Select label="" placeholder="Use limit to optimize performance" limit={5} data={[]} searchable />
              </TabPanel>

              {/* Geographic Filters */}
              <TabPanel value="2">

              </TabPanel>

              {/* Geographic Filters */}
              <TabPanel value="3">

              </TabPanel>
            </TabContext>
          </div>
          <div className={css`
            background-color: #1d1e30;
            color: white; 
            width: 100%;
            border-radius: 1rem;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
          `}>
            <div className={css`display: flex; flex-direction: column; align-items: center;`}>
              <Fab size="small" aria-label="add" className={css`background-color: green;`}>
                <SettingsIcon />
              </Fab>
              <div>Options</div>
            </div>
            <div className={css`display: flex; flex-direction: column; align-items: center;`}>
              <Fab size="small" color="success" aria-label="add">
                <FileUploadIcon />
              </Fab>
              <div>Load</div>
            </div>
            <div className={css`display: flex; flex-direction: column; align-items: center;`}>
              <Fab size="small" color="success" aria-label="add">
                <SaveIcon />
              </Fab>
              <div>Save</div>
            </div>
            <div className={css`display: flex; flex-direction: column; align-items: center;`}>
              <Fab size="small" color="primary" aria-label="add">
                <SendIcon />
              </Fab>
              <div>Execute</div>
            </div>
          </div>
        </div>

        {/* Chart / Table / Map Display Area */}
        <div style={{ gridColumn: '2/3', gridRow: '1/2', overflow: 'hidden', padding: '1rem', }}>
          <div className={css`display: flex; flex-direction: column; padding: 1rem; height: 100%;`}>
            <div ref={mapContainer} className={css`max-height: 100%; flex: 1; padding: 1rem;`} />
          </div>
        </div>


      </div>
    </>
  )
}

