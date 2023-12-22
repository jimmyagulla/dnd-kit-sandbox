import PropTypes from 'prop-types';

import { Entity } from '../../../types';
import { TableColumnProps, TableColumnPropTypes } from '../..';

export type AddingRowProps<T extends Entity, AddingForm> = {
  columns: TableColumnProps<T, AddingForm>[];
  hasRowSelection: boolean;
};

export const AddingRowPropTypes = {
  columns: PropTypes.arrayOf(PropTypes.exact(TableColumnPropTypes).isRequired)
    .isRequired,
  hasRowSelection: PropTypes.bool.isRequired,
};
