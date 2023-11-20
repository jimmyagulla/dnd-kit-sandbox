import { Key } from "react"
import PropTypes from 'prop-types';

import { PropTypesKey, Nullable} from ".";

export interface QuoteBase {
  id: Key;
  designation: string;
  quantity: number;
  unity: string;
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
  quantity: PropTypes.number.isRequired,
  unity: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tva: PropTypes.number.isRequired,
};

export { QuotePropTypes };
