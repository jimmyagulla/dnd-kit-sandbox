import { createContext, FC, useState } from 'react';

import { addQuotesKeys } from '../../lib/_utils';
import { Item, Nullable } from '../../types';
import {
  QuotationContextProps,
  QuotationContextPropTypes,
  QuotationProviderProps,
} from '.';

export const QuotationContext = createContext<QuotationContextProps>({
  cancel: () => {},
  dataSource: [],
  edit: () => {},
  editingKey: null,
  editingDataIndex: null,
  form: {} as any,
  save: async () => {},
});

export const QuotationProvider: FC<QuotationProviderProps> = ({
  children,
  form,
  quotes,
}) => {
  const [dataSource, setData] = useState<Item[]>(addQuotesKeys(quotes));
  const [editingKey, setEditingKey] = useState<Nullable<Item['key']>>(null);
  const [editingDataIndex, setEditingDataIndex] = useState<Nullable<keyof Item>>(null);

  const edit = (
    record: Partial<Item> & { key: string },
    dataIndex: keyof Item
  ): void => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
    setEditingDataIndex(dataIndex);
  };

  const cancel = (): void => {
    setEditingKey(null);
    setEditingDataIndex(null);
  };

  const udpateData = (levelItems: Item[], updatedRow: Item, key: string): Item[] => {
    return levelItems.map(item => {
      if (item.key === key) {
        return {
          ...item,
          ...updatedRow,
        }
      } else if (item.children?.length) {
        return {
          ...item,
          children: udpateData(item.children as Item[], updatedRow, key),
        }
      }
      return item;
    })
  };

  const save = async (key: string): Promise<void> => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = udpateData(dataSource, row, key);

      setData(newData);
      setEditingKey(null);
      setEditingDataIndex(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <QuotationContext.Provider value={{
      cancel,
      dataSource,
      edit,
      editingKey,
      editingDataIndex,
      form,
      save,
    }}>
      {children}
    </QuotationContext.Provider>
  );
};

QuotationProvider.displayName = 'TwpQuotationContext';

QuotationProvider.propTypes = QuotationContextPropTypes;
