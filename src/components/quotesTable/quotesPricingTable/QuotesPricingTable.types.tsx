import PropTypes from 'prop-types';

import {
  Quote,
  QuotePropTypes,
} from '../../../types';

export type VatDetail = {
  baseAmount: number;
  id: string | number;
  rate: number;
  tvaAmount: number;
};

export interface Vat {
  code: string;
  id: string | number;
  tva: number;
}

export interface QuotesPricingTableProps {
  dataSource: Quote[];
  vats: Vat[];
}

export const QuotesPricingTablePublicPropTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.exact(QuotePropTypes).isRequired)
    .isRequired,
  vats: PropTypes.arrayOf(PropTypes.any.isRequired)
    .isRequired,
};

export const QuotesPricingTablePropTypes = {
  ...QuotesPricingTablePublicPropTypes,
};
