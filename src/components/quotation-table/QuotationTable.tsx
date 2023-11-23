import './QuotationTable.scss';

import { FC, Key, RefObject, useEffect, useRef, useState } from 'react';
import { Form, Input, InputNumber, InputRef, Table } from 'antd';

import {
  QuotationTableProps,
  QuotationTablePropTypes,
  EditableCellProps,
  Item,
} from '.';
import { Nullable, Quote } from '../../types';

export const addQuotesKeys = (quotes: Quote[], depth: number = 0): Item[] => {
  return quotes.map(quote => ({
    ...quote,
    children: quote.children ? addQuotesKeys(quote.children, depth + 1) : undefined,
    key: quote.id,
    depth,
  }));
};

const EditableCell: FC<EditableCellProps> = ({
  editable,
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
  editingKey,
  editingDataIndex,
  setEditingDataIndex,
  depth,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isParentEditing, setIsParentEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const inputNode = inputType === 'number'
    ? <InputNumber ref={inputRef as unknown as RefObject<HTMLInputElement>} />
    : <Input ref={inputRef} />;

  useEffect(() => {
    if (editing && dataIndex === editingDataIndex) {
      inputRef.current?.focus();
    }
  }, [editing, dataIndex, editingDataIndex]);

  useEffect(() => {
    setIsEditing(editingKey === record.key);
    setIsParentEditing(record.key.toString().startsWith(String(editingKey)));
  }, [editingKey, setIsEditing, record.key]);

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

  const handleClick = () => {
    setEditingDataIndex(editable ? dataIndex : 'designation');
    edit(record);
  };

  return (
    <td
      {...restProps}
      className={`line-depth-${depth} ${isEditing ? 'current-line-edit' : isParentEditing ? 'parent-line-edit' : ''}`}
      onClick={handleClick}
    >
      {editable && editing ? (
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
  const [editingKey, setEditingKey] = useState<Nullable<Item['key']>>(null);
  const [editingDataIndex, setEditingDataIndex] = useState<Nullable<keyof Item>>(null);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key.toString());
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingDataIndex(null);
  };

  const save = async (key: Key) => {
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
        setEditingKey(null);
        setEditingDataIndex(null);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(null);
        setEditingDataIndex(null);
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Niv',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Désignation',
      dataIndex: 'designation',
      width: '55%',
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
    }
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        ...col,
        record,
        editing: isEditing(record),
        cancel: cancel,
        edit: edit,
        save: save,
        editingKey: editingKey,
        editingDataIndex: editingDataIndex,
        setEditingDataIndex: setEditingDataIndex,
        depth: record.depth,
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
        pagination={false}
        indentSize={0}
      />
    </Form>
  );
};

QuotationTable.displayName = 'QuotationTable';

QuotationTable.propTypes = QuotationTablePropTypes;

export default QuotationTable;
