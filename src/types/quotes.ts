import { Key } from "react"
import PropTypes from 'prop-types';

import { PropTypesKey, Nullable} from ".";

export interface QuoteBase {
  id: Key;
  designation: string;
  htUnitPrice: number;
  quantity: number;
  unit: string;
  total: number;
  tva: number;
};

export interface Quote extends QuoteBase {
  children?: Nullable<Quote[]>;
};

const QuotePropTypes = {
  id: PropTypesKey.isRequired,
  children: PropTypes.any.isRequired,
  designation: PropTypes.string.isRequired,
  htUnitPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tva: PropTypes.number.isRequired,
};

export { QuotePropTypes };
