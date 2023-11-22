import './QuotationTable.scss';

import { FC, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Form, FormInstance, Input, InputRef, Table } from 'antd';

import {
  QuotationTableProps,
  QuotationTablePropTypes,
  QuotationTableColumn,
  EditableCellProps,
  EditableRowProps,
  ColumnTypes,
} from '.';
import { addQuotesKeys } from '../../lib';
import { QuoteWithKey } from '../../types';

const EditableContext = createContext<FormInstance<any> | null>(null);

const defaultColumns: QuotationTableColumn[] = [
  {
    title: 'Niv',
    dataIndex: 'id',
  },
  {
    title: 'Désignation',
    dataIndex: 'designation',
    width: '50%',
    editable: true,
  },
  {
    title: 'Qté',
    dataIndex: 'quantity',
  },
  {
    title: 'Unité',
    dataIndex: 'unit',
  },

  {
    title: 'Total',
    dataIndex: 'total',
    width: '20%',
  },
  {
    title: 'TVA',
    dataIndex: 'tva',
  },
]

const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
};

const EditableCell: FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] })
  };

  const save = async () => {
    try {
      const values = await form?.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (e) {
      console.error(e);
    }
  }

  let childNode = children;


  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} est requis`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        onClick={toggleEdit}
        style={{ paddingRight: 24 }}
      >
        {children}
      </div>
    );
  }
  
  return <td {...restProps}>{childNode}</td>;
};

const QuotationTable: FC<QuotationTableProps> = ({ quotes }) => {
  const [dataSource, setDataSource] = useState<QuoteWithKey[]>(addQuotesKeys(quotes));

  const handleSave = (row: QuoteWithKey) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: QuoteWithKey) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      })
    }
  })

  return (
    <Table
      bordered
      columns={columns as ColumnTypes}
      components={components}
      dataSource={dataSource}
      rowClassName={() => 'editable-row'}
    />
  );
};

QuotationTable.displayName = 'QuotationTable';

QuotationTable.propTypes = QuotationTablePropTypes;

export default QuotationTable;