import PropTypes from 'prop-types';
import { ReactNode } from 'react';

export type QuotationProviderProps = {
  children: ReactNode;
};

export type QuotationContextProps = {
};

export const QuotationContextPublicPropTypes = {
  children: PropTypes.node.isRequired,
};

export const QuotationContextPropTypes = {
  ...QuotationContextPublicPropTypes,
};
