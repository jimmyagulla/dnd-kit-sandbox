import './QuoteCard.scss';

import { FC, useMemo } from 'react';

import { QuoteCardProps, QuoteCardPropTypes } from '.';

import { getQuoteColumns, defaultQuoteColumnStyle } from '../../lib';

const QuoteCard: FC<QuoteCardProps> = ({ quote }) => {
  const quoteColumns = useMemo(() => getQuoteColumns(), []);

  return (
    <div className='quote-card'>
      {quoteColumns.map((column, index) => (
        <span
          key={index}
          style={{
            ...column.style,
            ...defaultQuoteColumnStyle,
          }}
        >
          {quote[column.prop]?.toString()}
        </span>
      
      ))}
    </div>
  );
};

QuoteCard.displayName = 'QuoteCard';

QuoteCard.propTypes = QuoteCardPropTypes;

export default QuoteCard;