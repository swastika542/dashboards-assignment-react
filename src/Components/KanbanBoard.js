import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = {
  todo: { name: 'To Do', items: [{ id: '1', content: 'Task 1' }] },
  inProgress: { name: 'In Progress', items: [{ id: '2', content: 'Task 2' }] },
  done: { name: 'Done', items: [{ id: '3', content: 'Task 3' }] },
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [source.droppableId]: { ...sourceColumn, items: sourceItems },
      [destination.droppableId]: { ...destColumn, items: destItems },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(tasks).map(([columnId, column]) => (
        <Droppable key={columnId} droppableId={columnId}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ margin: '8px' }}>
              <h2>{column.name}</h2>
              {column.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '16px',
                        margin: '0 0 8px 0',
                        minHeight: '50px',
                        backgroundColor: '#456C86',
                        color: 'white',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default KanbanBoard;
