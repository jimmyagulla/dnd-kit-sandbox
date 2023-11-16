import './Draggable.scss';

import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { DraggableProps, DraggablePropTypes } from '.';

const Draggable: FC<DraggableProps>  = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

Draggable.displayName = 'Draggable';

Draggable.propTypes = DraggablePropTypes;

export default Draggable;
