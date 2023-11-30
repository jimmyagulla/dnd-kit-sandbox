import PropTypes from 'prop-types';

import { Quote, QuotePropTypes } from '.';

export interface Item extends Quote {
  key: string;
  depth: number;
};

export const ItemPropTypes = {
  ...QuotePropTypes,
  key: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
};
