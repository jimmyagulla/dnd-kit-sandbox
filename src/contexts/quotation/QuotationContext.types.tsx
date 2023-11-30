import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { FormInstance } from 'antd';

import { Quote, Item, Nullable } from '../../types';

export type QuotationProviderProps = {
  children: ReactNode;
  form: FormInstance<any>;
  quotes: Quote[];
};

export type QuotationContextProps = {
  cancel: () => void;
  dataSource: Item[];
  edit: (
    record: Partial<Item> & { key: string },
    dataIndex: keyof Item
  ) => void;
  editingKey: Nullable<Item['key']>;
  editingDataIndex: Nullable<keyof Item>;
  form: FormInstance;
  save: (key: string) => Promise<void>;
};

export const QuotationContextPublicPropTypes = {
  children: PropTypes.node.isRequired,
};

export const QuotationContextPropTypes = {
  ...QuotationContextPublicPropTypes,
};
