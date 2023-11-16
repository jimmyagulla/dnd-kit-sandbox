import { ReactNode } from 'react';
import PropTypes from 'prop-types';

export interface DraggableProps {
  children?: ReactNode;
};

export const DraggablePublicPropTypes = {
  children: PropTypes.node,
};

export const DraggablePropTypes = {
  ...DraggablePublicPropTypes,
};
