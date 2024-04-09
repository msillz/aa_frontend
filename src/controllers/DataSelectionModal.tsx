import { css } from '@emotion/css';
import { Grid, Card, Image, Text, Badge, Button, Group, Transition } from '@mantine/core';
import { useState } from 'react';
import InstImg from '../assets/banks.png'; // Adjust the path according to your file structure
import BranchImg from '../assets/branches.png'
import ForecastImg from '../assets/forecasting.png'
import AiImg from '../assets/ai_helper.png'
import CreateReportImg from '../assets/create_report.png'
import TemplateImg from '../assets/template.png'
import SavedImg from '../assets/saved.png'

export default function DataSelectionModal() {

  const [prevStates, setStateArray] = useState([]);
  const [currState, setModalState] = useState(0);

  function updateState(state){
    setModalState(state);
    document.getElementById('data-selection-body')?.querySelectorAll('div[data-state-number]').forEach(elem=>{
      elem.removeAttribute('data-show');
    });
    document.getElementById('data-selection-body')?.querySelector(`div[data-state-number="${state}"]`)?.setAttribute('data-show', true);
    console.log(state);
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

  return (
    <>
      <div id="data-selection-body">
        {currState !== 0 && (
          <Button color="gray" className={css`position: absolute; top: 1rem; z-index: 1000;`}>Back</Button>
        )}

        <div className={showHide} data-show data-state-number={0}>
          <MainSelector state_update={updateState}></MainSelector>
        </div>

        <div className={showHide} data-state-number={1}>
          <InstitutionalDataSelector state_update={updateState}></InstitutionalDataSelector>
        </div>
      </div>
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
