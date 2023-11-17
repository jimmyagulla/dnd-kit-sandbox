import { Key } from 'react';
import PropTypes from 'prop-types';

import { PropTypesKey, Quote, QuotePropTypes } from '../../types';

export interface QuotationProps {
  id: Key;
  quotes: Quote[];
}

export const QuotationPublicPropTypes = {
  id: PropTypesKey.isRequired,
  quotes: PropTypes.arrayOf(
    PropTypes.exact(QuotePropTypes).isRequired
  ).isRequired,
};

export const QuotationPropTypes = {
  ...QuotationPublicPropTypes,
}