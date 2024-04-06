import { css } from '@emotion/css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import chartElement from './chartElement';
import { useState } from 'react';
import { Text, Paper } from '@mantine/core';


// Define the functional component

export default function DataElementList({}){

    const [items, setItems] = useState<chartElement[]>([
        //new chartElement('hello'),
    ]);

    const addNewTab = () => {
        const newItem = new chartElement(`newItem${items.length}`);
        setItems((prevItems) => [...prevItems, newItem]);
    };

    // Handler for drag end event
    const onDragEnd = (result: any) => { // Consider using the correct type for 'result' based on the library's documentation
        if (!result.destination) return;
        const newItems = Array.from(items);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
        setItems(newItems);
    };

    // Render method of the functional component
    return (
        <div>
            <div style={{height: '2rem', width: '2rem', backgroundColor: 'red',}} onClick={addNewTab}></div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item.name} index={index} draggableId={item.name}>
                                    {(provided) => (
                                        <div
                                            className={css`
                                                width: 100%;
                                                margin-bottom: 1rem;`}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <DataComponentTab componentType={item.name} selected={item.selected} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}


function DataComponentTab(props:{componentType:string, selected:boolean}) {
  
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

