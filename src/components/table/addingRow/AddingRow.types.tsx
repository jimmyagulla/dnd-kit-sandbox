import PropTypes from 'prop-types';

import { Entity } from '../../../types';
import { TableColumnProps, TableColumnPropTypes } from '../..';

export type AddingRowProps<T extends Entity, AddingForm> = {
  columns: TableColumnProps<T, AddingForm>[];
  hasRowSelection: boolean;
};

export const AddingRowPropTypes = {
  columns: PropTypes.any,
  hasRowSelection: PropTypes.bool.isRequired,
};
