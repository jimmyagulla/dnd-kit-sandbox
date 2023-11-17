import { Key } from "react"
import PropTypes from 'prop-types';

import { PropTypesKey } from ".";

export interface Quote {
  id: Key;
  // children: Quote[];
  designation: string;
  quantity: number;
  unity: string;
  total: number;
  tva: number;
};

export const QuotePropTypes = {
  id: PropTypesKey.isRequired,
  designation: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  unity: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tva: PropTypes.number.isRequired,
};
