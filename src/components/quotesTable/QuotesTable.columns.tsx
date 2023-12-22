import { FormInstance } from 'antd';
import { Key, ReactNode } from 'react';

import { Quote, QuoteEditingForm } from '../../types';
import { currencyFormat } from '../../lib';
import {
  AntdFormItem,
  AntdInput,
  AntdSelect,
  AntdSelectOption,
  TableColumnProps,
  Vat,
} from '..';

const renderNumber = (value: Key, showCurrency = true): ReactNode => {
  if (!value) return null;

  return (
    <div>
      {currencyFormat(Number(value))} {showCurrency && '€'}
    </div>
  );
};

const tvaRender = (tva: Key, vats: Vat[]): ReactNode => {
  console.log('tva: ', tva, 'vats: ', vats);

  if (!tva) return null;

  const vat = vats.find((x) => String(x.id) === String(tva));

  return vat ? <div>{`[${vat.code}] ${vat.tva}%`}</div> : null;
};

export const quotesTableColumns = (
  form: FormInstance<Record<Key, QuoteEditingForm>>,
  units: string[],
  vats: Vat[],
): TableColumnProps<Quote, QuoteEditingForm>[] => {
  return [
    {
      dataIndex: 'level',
      title: 'Niv',
      width: 50,
    },
    {
      dataIndex: 'designation',
      key: 'designation',
      title: 'Désignation',
      width: 300,
      editingRender: (quote): ReactNode => {
        return (
          <AntdFormItem
            initialValue={quote?.designation}
            name={[quote?.level || '', 'designation']}
          >
            <AntdInput />
          </AntdFormItem>
        );
      },
    },
    {
      dataIndex: 'quantity',
      key: 'quantity',
      title: 'Quantité',
      width: 100,
      editingRender: (quote): ReactNode => {
        return (
          <AntdFormItem
            initialValue={quote?.quantity}
            name={[quote?.level || '', 'quantity']}
          >
            <AntdInput min={0} type="number" />
          </AntdFormItem>
        );
      },
      render: (quantity: number): ReactNode => renderNumber(quantity, false),
    },
    {
      dataIndex: 'unit',
      key: 'unit',
      title: 'Unité',
      width: 100,
      editingRender: (quote): ReactNode => {
        return (
          <AntdFormItem
            initialValue={quote?.unit}
            name={[quote?.level || '', 'unit']}
          >
            <AntdSelect
              allowClear
              defaultValue={quote?.unit}
              onClear={(): void => {
                form.setFieldValue([quote?.level || '', 'unit'], undefined);
              }}
              onSelect={(value): void => {
                form.setFieldValue([quote?.level || '', 'unit'], value);
              }}
            >
              {Object.entries(units).map(([key, value]) => (
                <AntdSelectOption key={key} value={value}>
                  {value}
                </AntdSelectOption>
              ))}
            </AntdSelect>
          </AntdFormItem>
        );
      },
    },
    {
      dataIndex: 'htUnitPrice',
      key: 'htUnitPrice',
      title: 'PU HT',
      width: 100,
      editingRender: (quote): ReactNode => {
        return (
          <AntdFormItem
            initialValue={quote?.htUnitPrice}
            name={[quote?.level || '', 'htUnitPrice']}
          >
            <AntdInput min={0} type="number" />
          </AntdFormItem>
        );
      },
      render: (htUnitPrice: number): ReactNode => renderNumber(htUnitPrice),
    },
    {
      dataIndex: 'total',
      key: 'total',
      title: 'Total',
      width: '10%',
      render: (total: number): ReactNode => renderNumber(total),
    },
    {
      dataIndex: 'tva',
      key: 'tva',
      title: 'TVA',
      width: 100,
      editingRender: (quote): ReactNode => {
        const tvaName = [quote?.level || '', 'tva'];

        return (
          <AntdFormItem initialValue={quote?.tva} name={tvaName}>
            <AntdSelect
              allowClear
              defaultValue={quote?.tva}
              onClear={(): void => {
                form.setFieldValue(tvaName, undefined);
              }}
              onSelect={(value: Key): void => {
                form.setFieldValue(tvaName, value);
              }}
            >
              {Object.entries(vats).map(([key, value]) => (
                <AntdSelectOption key={key} value={key}>
                  {`[${value.code}] ${value.tva}%`}
                </AntdSelectOption>
              ))}
            </AntdSelect>
          </AntdFormItem>
        );
      },
      render: (tva: Key): ReactNode => tvaRender(tva, vats),
    },
  ];
};
