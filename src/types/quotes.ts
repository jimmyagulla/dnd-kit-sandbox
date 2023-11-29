import PropTypes from 'prop-types';

import { Nullable} from ".";

export interface Quote {
  level: string;
  designation: string;
  htUnitPrice: number;
  quantity: number;
  unit: Nullable<string>;
  total: number;
  tva: Nullable<number>;
  children?: Nullable<Quote[]>;
};

const QuotePropTypes = {
  level: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  designation: PropTypes.string.isRequired,
  htUnitPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  tva: PropTypes.number.isRequired,
};

export { QuotePropTypes };
