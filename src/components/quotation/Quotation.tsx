// import './Quotation.scss';

// import { FC, useState } from 'react';
// import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
//   useSortable,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// import { QuotationProps, QuotationPropTypes } from '.';
// import { convertQuotesToTreeItems } from '../../lib';
// import { TreeItems } from 'dnd-kit-sortable-tree';
// import { Quote } from '../../types';

// interface SortableItemProps {
//   quote: Quote;
// };

// const SortableItem: FC<SortableItemProps> = ({ quote }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//   } = useSortable({ id: quote.id.toString() })

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <div className='quote-card'>{quote.id.toString()}</div>
//     </div>
//   )
// };

// const Quotation: FC<QuotationProps> = ({
//   id,
//   quotes,
// }) => {
//   const [items, setIems] =
//     useState<TreeItems<Quote>>(convertQuotesToTreeItems(quotes));

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       setIems((items) => {
//         const oldIndex = items.findIndex((item) => item.id === active.id);
//         const newIndex = items.findIndex((item) => item.id === over?.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <div className='quote-wrapper'>
//         <h1>test</h1>
//         <SortableContext
//           items={items}
//           strategy={verticalListSortingStrategy}
//         >
//           {items.map((item) => <SortableItem key={item.id} quote={item} />)}
//         </SortableContext>
//       </div>
//     </DndContext>
//   );
// };

// Quotation.displayName = 'Quotation';

// Quotation.propTypes = QuotationPropTypes;

// export default Quotation;



import './Quotation.scss';

import { FC, forwardRef, useState } from 'react';
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree';

import { QuotationProps, QuotationPropTypes } from '.';
import { Quote } from '../../types';
import { convertQuotesToTreeItems } from '../../lib/_utils';
import { QuoteCard } from '../quote-card';
import { QuotesHeader } from '../quotes-header';

const Quotation: FC<QuotationProps> = ({
  id,
  quotes,
}) => {
  const [items, setItems] = useState<TreeItems<Quote>>(convertQuotesToTreeItems(quotes));

  const sortItems = (items: TreeItems<Quote>, level?: string): TreeItems<Quote> => {
    let index = 0;

    return items.map(item => {
      const itemNumber = level ? `${level}.${++index}` : `${++index}`;

      return {
        ...item,
        id: itemNumber,
        children: item.children ? sortItems(item.children, itemNumber) : undefined
      }
    })
  }

  const onItemsChanged = (items: TreeItems<Quote>) => {
    const sortedItems = sortItems(items);

    setItems(sortedItems);
  }

  const TreeItem = forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<Quote>
  >((props, ref) => {
    console.log('props: ', props);
    return (
      <SimpleTreeItemWrapper {...props} showDragHandle={false} ref={ref} disableSorting>
        <QuoteCard quote={props.item} />
      </SimpleTreeItemWrapper>
    );
  });

  return (
    <div className='quotes-wrapper'>
      <QuotesHeader />
      <SortableTree
        items={items || []}
        onItemsChanged={onItemsChanged}
        TreeItemComponent={TreeItem}
        indentationWidth={0}
        indicator={true}
        sortableProps={{
          
        }}
      />
    </div>
  );
};

Quotation.displayName = 'Quotation';

Quotation.propTypes = QuotationPropTypes;

export default Quotation;