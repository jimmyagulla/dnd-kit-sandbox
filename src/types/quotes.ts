import PropTypes from 'prop-types';

import { Nullable, Entity, PropTypesKey, PropTypesEntity } from "./_utils";

export interface Quote extends Entity {
  children?: Nullable<Quote[]>;
  designation?: Nullable<string>;
  htUnitPrice?: Nullable<number>;
  level?: Nullable<string>;
  quantity?: Nullable<number>;
  total?: Nullable<number>;
  tva?: Nullable<string | number>;
  unit?: Nullable<string>;
}

export type QuoteEditingForm = Pick<
  Quote,
  'designation' | 'htUnitPrice' | 'quantity' | 'total' | 'tva' | 'unit'
>;

export const QuotePublicPropTypes = {
  ...PropTypesEntity,
  children: PropTypes.array,
  designation: PropTypes.string,
  htUnitPrice: PropTypes.number,
  level: PropTypes.string,
  quantity: PropTypes.number,
  total: PropTypes.number,
  tva: PropTypesKey,
  unit: PropTypes.string,
};

export const QuotePropTypes = {
  ...QuotePublicPropTypes,
};
