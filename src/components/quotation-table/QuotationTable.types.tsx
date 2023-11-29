import { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { Nullable, Quote, QuotePropTypes } from '../../types';
import { Table } from 'antd';

export type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
export type InputType = 'number' | 'text';

export interface QuotationTableProps {
  quotes: Quote[];
};

export interface Item extends Quote {
  key: string;
  depth: number;
};

export interface EditableCellProps {
  cancel: () => void;
  children: ReactNode;
  dataIndex: string;
  edit: (record: Partial<Item> & { key: string }) => void;
  editable?: Nullable<boolean>;
  editing: boolean;
  editingKey: Nullable<Item['key']>;
  editingDataIndex: Nullable<keyof Item>;
  depth: number;
  index: number;
  inputType: InputType;
  record: Item;
  save: (key: string) => void;
  setEditingDataIndex: (dataIndex: string) => void;
  title: any;
};

export type QuotationTableTitleFields = Omit<Quote, 'unit' | 'tva'>;

export const QuotationTablePublicPropTypes = {
  quotes: PropTypes.arrayOf(
    PropTypes.exact(QuotePropTypes).isRequired,
  ).isRequired,
};

export const QuotationTablePropTypes = {
  ...QuotationTablePublicPropTypes,
};