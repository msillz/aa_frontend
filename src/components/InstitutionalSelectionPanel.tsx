
import { css } from '@emotion/react';
import { Tabs } from '@mantine/core';


function InstitutionalSelectionPanel() {


  const listStyle = css`
    
  `

  return (
    <>
    <div>
        <h3 style={{textAlign: "center"}}>Data Component 1</h3>
        <Tabs defaultValue="gallery" orientation="horizontal" >
            <Tabs.List grow={true}>
                <Tabs.Tab value="peers">Peers</Tabs.Tab>
                <Tabs.Tab value="metrics">Metrics</Tabs.Tab>
                <Tabs.Tab value="dates">Dates</Tabs.Tab>
                <Tabs.Tab value="options">Options</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="peers">Peer Options</Tabs.Panel>
            <Tabs.Panel value="metrics">Metric Options</Tabs.Panel>
            <Tabs.Panel value="dates">Date Options</Tabs.Panel>
            <Tabs.Panel value="options">Other Options</Tabs.Panel>
        </Tabs>
    </div>
    </>
  )
}

export default InstitutionalSelectionPanel
