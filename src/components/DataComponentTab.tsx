import { useState } from 'react'
import { Text, Paper } from '@mantine/core';
import { css } from '@emotion/css';

function DataComponentTab(props:{componentType:string, selected:boolean}) {

  const [count, setCount] = useState(0)

  const tabStyle = css`
    cursor: grab;
    &:hover {
      background-color: #DDD;
    }
    &[data-selected="true"]{
      border: 0.2rem solid #54b7ff;
    }
  `
  
  return (
    <>
      <Paper data-selected={props.selected} className={tabStyle} shadow="xs" radius="md" withBorder p="sm">
        <Text>{props.componentType}</Text>
      </Paper>
    </>
  )
}

export default DataComponentTab
