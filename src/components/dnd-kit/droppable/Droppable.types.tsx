import { ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface DroppableProps {
  children?: ReactNode;
};

export const DroppablePublicPropTypes = {
  children: PropTypes.node,
};

export const DroppablePropTypes = {
  ...DroppablePublicPropTypes,
};
