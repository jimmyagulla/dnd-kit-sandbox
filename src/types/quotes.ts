import { Key } from "react"
import PropTypes from 'prop-types';

import { PropTypesKey, Nullable} from ".";

export interface Quote {
  id: Key;
  children?: Nullable<Quote[]>;
  designation: string;
  quantity: number;
  unity: string;
  total: number;
  tva: number;
};

const QuotePropTypes = {
  id: PropTypesKey.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
  designation: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unity: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tva: PropTypes.number.isRequired,
};

QuotePropTypes.children = PropTypes.arrayOf(PropTypes.shape(QuotePropTypes).isRequired);

export { QuotePropTypes };
