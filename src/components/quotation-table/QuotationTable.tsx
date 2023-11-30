import './QuotationTable.scss';

import { FC, useContext } from 'react';
import { Form, Table } from 'antd';

import { QuotationContext } from '../../contexts';
import { Item } from '../../types';
import { EditableCell } from '..';
import {
  QuotationTableProps,
  QuotationTablePropTypes,
} from '.';

const QuotationTable: FC<QuotationTableProps> = () => {
  const {
    dataSource,
    form
  } = useContext(QuotationContext);

  const columns = [
    {
      title: 'Niv',
      dataIndex: 'level',
      width: '10%',
    },
    {
      title: 'Désignation',
      dataIndex: 'designation',
      width: '50%',
      editable: true,
    },
    {
      title: 'Quantité',
      dataIndex: 'quantity',
      width: '5%',
      editable: true,
      inputType: 'number',
    },
    {
      title: 'Unité',
      dataIndex: 'unit',
      width: '5%',
      editable: true,
    },
    {
      title: 'PU HT',
      dataIndex: 'htUnitPrice',
      width: '10%',
      editable: true,
      inputType: 'number',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '10%',
    },
    {
      title: 'TVA',
      dataIndex: 'tva',
      width: '5%',
      editable: true,
      inputType: 'number',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '3%',
    }
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        ...col,
        record,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={dataSource}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        indentSize={0}
      />
    </Form>
  );
};

QuotationTable.displayName = 'QuotationTable';

QuotationTable.propTypes = QuotationTablePropTypes;

export default QuotationTable;
