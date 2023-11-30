import PropTypes from 'prop-types';

import { Quote, QuotePropTypes } from '../../types';
import { Table } from 'antd';

export type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export interface QuotationTableProps {};

export type QuotationTableTitleFields = Omit<Quote, 'unit' | 'tva'>;

export const QuotationTablePublicPropTypes = {
  quotes: PropTypes.arrayOf(
    PropTypes.exact(QuotePropTypes).isRequired,
  ).isRequired,
};

export const QuotationTablePropTypes = {
  ...QuotationTablePublicPropTypes,
};