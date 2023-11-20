import './Quotation.scss';

import { FC, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { QuotationProps, QuotationPropTypes } from '.';
import { convertQuotesToTreeItems } from '../../lib';
import { TreeItems } from 'dnd-kit-sortable-tree';
import { Quote } from '../../types';

const SortableItem: FC<any> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='quote-content'>{props.id}</div>
    </div>
  )
};

const Quotation: FC<QuotationProps> = ({
  id,
  quotes,
}) => {
  const [items, setIems] =
    useState<TreeItems<Quote>>(convertQuotesToTreeItems(quotes));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setIems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className='quote-wrapper'>
        <h1>test</h1>
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => <SortableItem key={item.id} id={item.id} />)}
        </SortableContext>
      </div>
    </DndContext>
  );
};

Quotation.displayName = 'Quotation';

Quotation.propTypes = QuotationPropTypes;

export default Quotation;