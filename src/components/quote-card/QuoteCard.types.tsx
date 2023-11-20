import PropTypes from 'prop-types';

import { Quote, QuotePropTypes } from '../../types';

export interface QuoteCardProps {
  quote: Quote;
};

export const QuoteCardPublicPropTypes = {
  quote: PropTypes.exact(QuotePropTypes).isRequired,
};

export const QuoteCardPropTypes = {
  ...QuoteCardPublicPropTypes,
};
