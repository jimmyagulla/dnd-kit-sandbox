import './QuotesHeader.scss';

import { FC, useMemo } from 'react';

import { QuotesHeaderProps, QuotesHeaderPropTypes } from '.';
import { getQuoteColumns, defaultQuoteColumnStyle } from '../../lib';

const QuotesHeader: FC<QuotesHeaderProps> = () => {
  const quoteColumns = useMemo(() => getQuoteColumns(), []);

  return (
    <div className='quote-header'>
      {quoteColumns.map((column, index) => (
        <span
          key={index}
          style={{
            ...column.style,
            ...defaultQuoteColumnStyle,
          }}
        >
          {column.label}
        </span>
      ))}
    </div>
  );
};

QuotesHeader.displayName = 'QuotesHeader';

QuotesHeader.propTypes = QuotesHeaderPropTypes;

export default QuotesHeader;