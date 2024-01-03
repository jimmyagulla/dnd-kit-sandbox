import './QuotesTable.scss';

import { FC, Key, useCallback, useEffect, useState } from 'react';

import {
  Nullable,
  Quote,
  QuoteEditingForm,
} from '../../types';
import { AntdDeleteOutlinedIcon, AntdEditOutlinedIcon, AntdSpace, AntdUseForm, CustomActionButtons, PrimaryButton, QuotesPricingTable, Table } from '..';
import {
  getQuoteTotal,
  quotesTableColumns,
  QuotesTableProps,
  QuotesTablePropTypes,
  Vat,
} from '.';

const QuotesTable: FC<QuotesTableProps> = ({
  getAutocompleteUrl,
  updateQuotationUrl,
}) => {
  const [dataSource, setDataSource] = useState<Quote[]>([
    {
      id: '1',
      designation: 'Prestation de service',
      level: '1',
      htUnitPrice: 100,
      quantity: 1,
      total: 100,
      unit: 'u',
      tva: '0',
      children: [
        {
          id: '2',
          designation: 'Prestation de service',
          level: '1.1',
          htUnitPrice: 100,
          quantity: 1,
          total: 100,
          unit: 'u',
          tva: '0',
        },
      ],
    },
  ]);
  const [form] = AntdUseForm<Record<Key, QuoteEditingForm>>();
  const [units, setUnits] = useState<Nullable<string[]>>(null);
  const [vats, setVats] = useState<Nullable<Vat[]>>(null);

  const isEmpty = (obj: object): boolean =>
    !Object.values(obj).some((x) => x !== null && x !== undefined && x !== '');

  const onAdd = (formValues: QuoteEditingForm): void => {
    if (isEmpty(formValues)) {
      return;
    }

    const newDataSource: Quote[] = [...dataSource];
    const newRow: Quote = {
      id: String(newDataSource.length + 1),
      ...formValues,
      level: String(newDataSource.length + 1),
      total: getQuoteTotal(formValues as Quote),
    };

    newDataSource.push(newRow);
    setDataSource(newDataSource);
  };

  const onDelete = (record: Quote): void => {
    const newDataSource: Quote[] = [...dataSource];
    const index = newDataSource.findIndex((quote) => quote.id === record.id);

    newDataSource.splice(index, 1);
    setDataSource(newDataSource);
  };

  const onEdit = (formValues: QuoteEditingForm, record: Quote): void => {
    if (isEmpty(formValues)) {
      onDelete(record);

      return;
    }

    const newDataSource: Quote[] = [...dataSource];
    const index = newDataSource.findIndex((quote) => quote.id === record.id);
    const newQuote: Quote = {
      ...newDataSource[index],
      ...formValues,
      total: getQuoteTotal(formValues as Quote),
    };

    newDataSource[index] = newQuote;
    setDataSource(newDataSource);
  };

  const onSaveQuotation = useCallback((): void => {
    // will be implemented in close future
    // need to wait for En-tête de devis to be implemented as it has the events
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateQuotationUrl, dataSource]);

  useEffect(() => {
    const initUnits = (): void => {
      setUnits(['m2', 'm3', 'ml', 'u']);
    };

    const initVats = (): void => {
      setVats([
        { code: 'eiud3', id: 0, tva: 20 },
        { code: 'fe32f', id: 1, tva: 10 },
        { code: 'grz33', id: 2, tva: 5.5 }
      ]);
    };

    initUnits();
    initVats();
  }, [getAutocompleteUrl]);

  const quotesTableActionButtons = (): CustomActionButtons => {
    return {
      editButton: (
        <AntdSpace>
          <AntdEditOutlinedIcon />
          <span>Modifier</span>
        </AntdSpace>
      ),
      deleteButton: (
        <AntdSpace>
          <AntdDeleteOutlinedIcon style={{ color: 'red' }} />
          <span>Supprimer</span>
        </AntdSpace>
      )
    }
  }

  return (
    <div className="twp-quote-table">
      <div className="quote-table-save-button-wrapper">
        <PrimaryButton onClick={onSaveQuotation}>Enregister</PrimaryButton>
      </div>
      {units && vats && (
        <div className="quotes-wrapper">
          <Table<Quote, QuoteEditingForm>
            bordered
            columns={quotesTableColumns(form, units, vats)}
            customForm={form}
            customActionButtons={quotesTableActionButtons()}
            dataSource={dataSource}
            emptyProps={{
              description: 'Aucune ligne de devis',
            }}
            indentSize={0}
            interactive
            isAdding
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            pagination={false}
            rowClassName={(): string => {
              return `line-depth-1`;
            }}
            scroll={{ x: 1024 }}
            style={{ width: '70vw' }}
          />
          <div style={{ width: '20vw' }}>
            <QuotesPricingTable dataSource={dataSource} vats={vats} />
          </div>
        </div>
      )}
    </div>
  );
};

QuotesTable.displayName = 'QuotesTable';

QuotesTable.propTypes = QuotesTablePropTypes;

export default QuotesTable;
