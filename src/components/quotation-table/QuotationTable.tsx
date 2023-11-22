import './QuotationTable.scss';

import { FC, Key, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Form, FormInstance, Input, InputNumber, InputRef, Popconfirm, Table, Typography } from 'antd';

import {
  QuotationTableProps,
  QuotationTablePropTypes,
  QuotationTableColumn,
  EditableCellProps,
  EditableRowProps,
  ColumnTypes,
  Item,
} from '.';
import { Quote } from '../../types';

// const EditableContext = createContext<FormInstance<any> | null>(null);

// const defaultColumns: QuotationTableColumn[] = [
//   {
//     title: 'Niv',
//     dataIndex: 'id',
//   },
//   {
//     title: 'Désignation',
//     dataIndex: 'designation',
//     width: '50%',
//     editable: true,
//   },
//   {
//     title: 'Qté',
//     dataIndex: 'quantity',
//     editable: true,
//   },
//   {
//     title: 'Unité',
//     dataIndex: 'unit',
//     editable: true,
//   },

//   {
//     title: 'Total',
//     dataIndex: 'total',
//     width: '20%',
//   },
//   {
//     title: 'TVA',
//     dataIndex: 'tva',
//     editable: true,
//   },
// ]

// const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
//   const [form] = Form.useForm();

//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   )
// };

// const EditableCell: FC<EditableCellProps> = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext);

//   useEffect(() => {
//     if (editing) {
//       inputRef.current?.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
//   };

//   const save = async () => {
//     try {
//       const values = await form?.validateFields();

//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   let childNode = children;


//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{ margin: 0 }}
//         name={dataIndex}
//         rules={[
//           {
//             required: true,
//             message: `${title} est requis`,
//           },
//         ]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         onClick={toggleEdit}
//         style={{ paddingRight: 24 }}
//       >
//         {children}
//       </div>
//     );
//   }
  
//   return <td {...restProps}>{childNode}</td>;
// };

// const QuotationTable: FC<QuotationTableProps> = ({ quotes }) => {
//   const [dataSource, setDataSource] = useState<QuoteWithKey[]>(addQuotesKeys(quotes));

//   const handleSave = (row: QuoteWithKey) => {
//     const newData = [...dataSource];
//     const index = newData.findIndex((item) => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     setDataSource(newData);
//   }

//   const components = {
//     body: {
//       row: EditableRow,
//       cell: EditableCell,
//     },
//   };

//   const columns = defaultColumns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }

//     return {
//       ...col,
//       onCell: (record: QuoteWithKey) => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title,
//         handleSave,
//       })
//     }
//   })

//   return (
//     <Table
//       bordered
//       columns={columns as ColumnTypes}
//       components={components}
//       dataSource={dataSource}
//       rowClassName={() => 'editable-row'}
//     />
//   );
// };

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
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
      console.log('Validate Failed:', errInfo);
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
        edit: edit,
        editing: isEditing(record),
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