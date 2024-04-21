import SettingsIcon from '@mui/icons-material/Settings';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ScrollArea, Tooltip } from '@mantine/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InstitutionalSelectionPanel from "../components/InstitutionalSelectionPanel";
import DataElementList from "../controllers/dataElementControllers";
import DataSelectionModal from '../controllers/DataSelectionModal';
import { css } from '@emotion/css';
import { useState, useEffect } from 'react';
import MetricSearch from '../components/MetricSearch';



export default function Dashboard() {

  const mainGridStyle = css`
    padding-top: 4rem;
    display: grid;
    grid-template-columns: 18rem 22rem 1fr;
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


  return (
    <>
      <div className={mainGridStyle}>

        {/* Component List */}
        <div className={componentListStyle}>
        <MetricSearch></MetricSearch>
          
        </div>
        
        {/* Chart / Table / Map Display Area */}
        <div style={{gridColumn: '2/3', gridRow: '1/2'}}>

        </div>
        <div style={{backgroundColor: '#bbb', gridColumn: '3/4', gridRow: '1/2'}}>

        </div>

      </div>
    </>
  )
}

