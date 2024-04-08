import { css } from '@emotion/css';
import { Grid, Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import InstImg from '../assets/data_inst_black.png'; // Adjust the path according to your file structure

function DataSelectionModal() {
  return (
    <>
    <h2 style={{marginTop: '0'}}>Select Data Type</h2>
    <Grid gutter="2rem">
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Image
                src={InstImg}
                alt="Norway"
                style={{height: '7rem', width: '10rem'}}
              />
            </div>
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Institutional</Text>
            <Badge color="gray">Default</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            Add data from an institutional level. This data includes the call report datasets from both the FDIC as well as the NCUA.
          </Text>

          <Button color="blue" fullWidth mt="md" radius="md">
            Add Institutional Data
          </Button>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{height: '100%', justifyContent: 'space-between'}}>
          <div>
            <Card.Section>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image
                  src={InstImg}
                  alt="Norway"
                  style={{height: '7rem', width: '10rem'}}
                />
              </div>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Branch</Text>
            </Group>

            <Text size="sm" c="dimmed">
              Add data at a branch level. Analyze FDIC branch deposit growth, branch aquisitions, and more.
            </Text>
          </div>

          <Button color="blue" fullWidth mt="md" radius="md">
            Add Branch Data
          </Button>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder  style={{height: '100%', justifyContent: 'space-between'}}>
          <div>
            <Card.Section>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Image
                  src={InstImg}
                  alt="Norway"
                  style={{height: '7rem', width: '10rem'}}
                />
              </div>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>Forecasting</Text>
            </Group>

            <Text size="sm" c="dimmed">
              Create a forecast model using various data sources.
            </Text>
          </div>

          <Button color="blue" fullWidth mt="md" radius="md">
            Add Forecasting Model
          </Button>
        </Card>
      </Grid.Col>
    </Grid>
    </>
  )
}


function Selector1(){
  
}

export default DataSelectionModal
