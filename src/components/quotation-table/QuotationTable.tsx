import './QuotationTable.scss';

import { FC, Key, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Table } from 'antd';

import {
  QuotationTableProps,
  QuotationTablePropTypes,
  EditableCellProps,
  Item,
} from '.';
import { Quote } from '../../types';

export const addQuotesKeys = (quotes: Quote[]): Item[] => {
  return quotes.map(quote => ({
    ...quote,
    children: quote.children ? addQuotesKeys(quote.children) : undefined,
    key: quote.id
  }));
}

const EditableCell: React.FC<EditableCellProps> = ({
  edit,
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  save,
  cancel,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  useEffect(() => {
    if (!editing) return;

    const handleKeyboardEvents = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          return save(record.key);
        case 'Escape':
          return cancel();
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyboardEvents);

    return () => {
      window.removeEventListener('keydown', handleKeyboardEvents);
    }
  }, [cancel, editing, record, save]);

  return (
    <td {...restProps} onClick={() => edit(record)}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const QuotationTable: FC<QuotationTableProps> = ({ quotes }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>(addQuotesKeys(quotes));
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Niv',
      dataIndex: 'id',
      width: '25%',
      editable: true,
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
      width: '25%',
      editable: true,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        cancel: cancel,
        edit: edit,
        save: save,
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
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

QuotationTable.displayName = 'QuotationTable';

QuotationTable.propTypes = QuotationTablePropTypes;

export default QuotationTable;