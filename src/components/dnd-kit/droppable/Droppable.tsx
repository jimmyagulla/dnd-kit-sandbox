import './Droppable.scss';

import { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

import { DroppableProps, DroppablePropTypes } from '.';

const Droppable: FC<DroppableProps> = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

Droppable.displayName = 'Droppable';

Droppable.propTypes = DroppablePropTypes;

export default Droppable;
