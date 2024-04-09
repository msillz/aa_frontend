import { css } from '@emotion/css';
import { Modal, Grid, Card, Image, Text, Badge, Button, Group, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useState, useEffect } from 'react';
import InstImg from '../assets/banks.png'; // Adjust the path according to your file structure
import BranchImg from '../assets/branches.png'
import ForecastImg from '../assets/forecasting.png'
import AiImg from '../assets/ai_helper.png'
import CreateReportImg from '../assets/create_report.png'
import TemplateImg from '../assets/template.png'
import SavedImg from '../assets/saved.png'



export default function DataSelectionModal({isModalOpen, setIsModalOpen}) {

  const [prevStates, setStateArray] = useState([]);
  const [currState, setModalState] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function goBack() {

    // Check if there are previous states to revert to
    if (prevStates.length > 0) {
      const lastState = prevStates[prevStates.length - 1]; // Get the last state
      setModalState(lastState); // Set the current state to the last state
      setStateArray(prevStates => prevStates.slice(0, -1)); // Remove the last state from the array
    }
  }

  function updateState(newState){
    if (newState !== currState) { // Check if the new state is different from the current state
      setModalState(newState); // Update the current state
      setStateArray(prevStates => [...prevStates, currState]); // Add the current state to the previous states array
    }
  }


  const showHide = css`
    opacity: 0;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    transition: opacity .5s ease-in-out;

    &[data-show]{
      opacity: 1;
      height: 100%;
      visibility: initial;
    }
  `

  // The Add Data Modal
  const backButton = currState !== 0 && (
    <Button
      onClick={goBack} // Ensure goBack function is defined and accessible in this scope
      data-type="backButton"
      color="gray"
      className={css`position: absolute; top: 1rem; z-index: 1000;`}
    >
      Back
    </Button>
  );

  return (
    <>
    <Modal
          opened={isModalOpen}
          onClose={closeModal}
          keepMounted={false}
          size='xxl'
          title={backButton}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 1,
          }}
          className={css`position: relative;`}
        >
          <div id="data-selection-body">
            <div className={showHide} {...(currState === 0 ? {'data-show': 'true'} : {})}>
              <MainSelector state_update={updateState}></MainSelector>
            </div>

            <div className={showHide} {...(currState === 1 ? {'data-show': 'true'} : {})}>
              <InstitutionalDataSelector state_update={updateState}></InstitutionalDataSelector>
            </div>
          </div>
      </Modal>
      
    </>
  )
}


function ModalNavCard({imgElem, title, description, button_name, state_fxn, default_button = false, next_state=0}){
  return (
    <>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Image src={imgElem} alt="Norway" style={{height: '7rem', width: '10rem', paddingTop: '1rem', padding: '.5rem'}}/>
            </div>
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{title}</Text>
            {default_button && <Badge color="gray">Default</Badge>}
          </Group>

          <Text size="sm" c="dimmed">
            {description}
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md" onClick={() => state_fxn(next_state)}>
            {button_name}
          </Button>
        </Card>
    </>
  )
}

function InstitutionalDataSelector({state_update}){
  return (
    <>
    <h2 style={{marginTop: '0'}}>How do you want to add the data?</h2>
    <Grid gutter="2rem">
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ModalNavCard 
          imgElem={AiImg} 
          title={"Build with AI"} 
          description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
          button_name={"Use AI Assistant"}
          default_button={true}
          state_fxn={state_update}
        ></ModalNavCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ModalNavCard 
            imgElem={CreateReportImg} 
            title={"Create from Scratch"} 
            description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
            button_name={"Choose Blank Element"}
            default_button={false}
            state_fxn={state_update}
          ></ModalNavCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ModalNavCard 
            imgElem={TemplateImg} 
            title={"From Template"} 
            description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
            button_name={"Choose Starting Template"}
            default_button={false}
            state_fxn={state_update}
          ></ModalNavCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ModalNavCard 
            imgElem={SavedImg} 
            title={"From Saved"} 
            description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
            button_name={"Load Saved Element"}
            default_button={false}
            state_fxn={state_update}
          ></ModalNavCard>
      </Grid.Col>
    </Grid>
    </>
  )
}

function MainSelector({state_update}){
  return (
    <>
    <h2 style={{marginTop: '0'}}>Select Data Type</h2>
    <Grid gutter="2rem">
      <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
        <ModalNavCard 
          imgElem={InstImg} 
          title={"Institutional"} 
          description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
          button_name={"Add Institutional Data"}
          default_button={true}
          state_fxn={state_update}
          next_state={1}
        ></ModalNavCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
        <ModalNavCard 
            imgElem={BranchImg} 
            title={"Branch"} 
            description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
            button_name={"Add Branch Data"}
            default_button={false}
            state_fxn={state_update}
          ></ModalNavCard>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
        <ModalNavCard 
            imgElem={ForecastImg} 
            title={"Forecasting"} 
            description={"Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA."}
            button_name={"Add Forecasting Data"}
            default_button={false}
            state_fxn={state_update}
          ></ModalNavCard>
      </Grid.Col>
    </Grid>
    </>
  )
}
