import './QuoteCard.scss';

import { FC } from 'react';

import { QuoteCardProps, QuoteCardPropTypes } from '.';

const QuoteCard: FC<QuoteCardProps> = ({ quote }) => {
  return (
    <>
      <div className='quote-card'>
        {quote.id.toString()}
      </div>
      {/* <div className='quote-actions-popover'>
        test
      </div> */}
    </>
  );
};

QuoteCard.displayName = 'QuoteCard';

QuoteCard.propTypes = QuoteCardPropTypes;

export default QuoteCard;