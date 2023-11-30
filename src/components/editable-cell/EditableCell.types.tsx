import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Nullable, Item, ItemPropTypes } from '../../types';

export type InputType = 'number' | 'text';

export enum QuotationTableDropdownActions {
  ADD_LINE,
  ADD_CHILD,
  DELETE_LINE,
};

export interface EditableCellProps {
  children: ReactNode;
  dataIndex: string;
  editable?: Nullable<boolean>;
  index: number;
  inputType: InputType;
  record: Item;
  title: any;
};

export const EditableCellPublicPropTypes = {
  children: PropTypes.node.isRequired,
  dataIndex: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  index: PropTypes.number.isRequired,
  inputType: PropTypes.oneOf<InputType>(['number', 'text']).isRequired,
  record: PropTypes.shape(ItemPropTypes).isRequired,
  title: PropTypes.any.isRequired
};

export const EditableCellPropTypes = {
  ...EditableCellPublicPropTypes,
};
