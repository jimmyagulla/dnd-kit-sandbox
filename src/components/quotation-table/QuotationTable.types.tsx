import { Key, ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Nullable, Quote, QuotePropTypes } from '../../types';
import { Table } from 'antd';

export type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export interface QuotationTableProps {
  quotes: Quote[];
};

export interface Item extends Quote {
  key: Key;
};

export interface EditableCellProps {
  editable: boolean;
  edit: (record: Partial<Item> & { key: Key}) => void;
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: ReactNode;
  save: (key: Key) => void;
  cancel: () => void;
  editingDataIndex: Nullable<keyof Item>;
  setEditingDataIndex: (dataIndex: string) => void;
}

export interface EditableRowProps {
  index: number;
};

export const QuotationTablePublicPropTypes = {
  quotes: PropTypes.arrayOf(
    PropTypes.exact(QuotePropTypes).isRequired,
  ).isRequired,
};

export const QuotationTablePropTypes = {
  ...QuotationTablePublicPropTypes,
};