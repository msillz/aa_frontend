import SettingsIcon from '@mui/icons-material/Settings';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, ScrollArea, Tooltip } from '@mantine/core';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InstitutionalSelectionPanel from "../components/InstitutionalSelectionPanel";
import DataElementList from "../controllers/dataElementControllers";
import DataSelectionModal from '../controllers/DataSelectionModal';
import { css } from '@emotion/css';


function DataExplorer() {

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

  // The Add Data Modal
  const [opened, { open, close }] = useDisclosure(false);


  return (
    <>

      <Modal
          opened={opened}
          onClose={close}
          keepMounted={true}
          size='xxl'
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 1,
          }}
          className={css`position: relative;`}
        >
          <DataSelectionModal></DataSelectionModal>
      </Modal>

      <div className={mainGridStyle}>

        {/* Component List */}
        <div className={componentListStyle}>

          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <Button variant="outline" size="sm" radius="xl" style={{width: 'fit-content'}} onClick={open}>Add Data +</Button>
            <Button variant="outline" size="sm" radius="xl" style={{width: 'fit-content'}} onClidk={DataElementList.addNewTab}><SettingsIcon></SettingsIcon></Button>
          </div>

          <ScrollArea style={{padding: 0, margin: 0, width: '100%', marginTop: '2rem', marginBottom: '2rem', paddingRight: '1rem', flex: 1}}>
            <DataElementList></DataElementList>
          </ScrollArea>

          <Button variant="outline" size="sm" radius="xl" style={{width: '100%'}}>
            <div style={{marginRight: '.5rem'}}>Generate Report</div>
            <AssignmentIcon fontSize="small"></AssignmentIcon>
          </Button>
        </div>
        
        {/* Chart / Table / Map Display Area */}
        <div style={{gridColumn: '2/3', gridRow: '1/2'}}>
          <InstitutionalSelectionPanel></InstitutionalSelectionPanel>
        </div>
        <div style={{backgroundColor: '#bbb', gridColumn: '3/4', gridRow: '1/2'}}>Hey</div>

      </div>
    </>
  )
}

export default DataExplorer
