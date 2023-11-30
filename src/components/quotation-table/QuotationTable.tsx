import './QuotationTable.scss';

import {
  FC,
  RefObject,
  useEffect,
  useRef,
  useState,
  useContext
} from 'react';
import {
  Form,
  Input,
  InputNumber,
  InputRef,
  Table,
  Dropdown,
  MenuProps
} from 'antd';
import {
  EllipsisOutlined,
  DeleteOutlined,
  PlusOutlined,
  EnterOutlined
} from '@ant-design/icons';

import { Item } from '../../types';
import {
  QuotationTableProps,
  QuotationTablePropTypes,
  EditableCellProps,
  QuotationTableDropdownActions,
} from '.';
import { QuotationContext } from '../../contexts';

const menuItems: MenuProps['items'] = [
  {
    key: '0',
    label: 'Ajouter une ligne',
    icon: <PlusOutlined style={{ color: 'green' }} />,
  },
  {
    key: '1',
    label: 'Ajouter un enfant',
    icon: <EnterOutlined style={{ color: 'blue' }} />,
  },
  {
    key: '2',
    label: 'Supprimer la ligne',
    icon: <DeleteOutlined style={{ color: 'red' }} />,
  }
]

const EditableCell: FC<EditableCellProps> = ({
  editable,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const {
    edit,
    editingKey,
    editingDataIndex,
    save,
    cancel,
  } = useContext(QuotationContext);
  const [isEditing, setIsEditing] = useState(editingKey === record.key);
  const [isParentEditing, setIsParentEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const inputNode = inputType === 'number'
    ? <InputNumber ref={inputRef as unknown as RefObject<HTMLInputElement>} />
    : <Input ref={inputRef} />;

  useEffect(() => {
    if (isEditing && dataIndex === editingDataIndex) {
      inputRef.current?.focus();
    }
  }, [isEditing, dataIndex, editingDataIndex]);

  useEffect(() => {
    setIsEditing(editingKey === record.key);
    setIsParentEditing(record.key.startsWith(String(editingKey)));
  }, [editingKey, setIsEditing, record.key]);

  useEffect(() => {
    if (!isEditing) return;

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
  }, [cancel, isEditing, record, save]);

  const handleClickOnCell = () =>
    edit(record, (editable ? dataIndex : 'designation') as keyof Item);

  const handleDropdownClick: MenuProps['onClick'] = ({ key }) => {
    switch (Number(key)) {
      case QuotationTableDropdownActions.ADD_LINE:
        return console.log('ADD_LINE');
      case QuotationTableDropdownActions.ADD_CHILD:
        return console.log('ADD_CHILD');
      case QuotationTableDropdownActions.DELETE_LINE:
        return console.log('DELETE_LINE');
      default:
        break;
    }
  };

  return (
    <td
      {...restProps}
      className={`line-depth-${record.depth} ${isEditing ? 'current-line-edit' : isParentEditing ? 'parent-line-edit' : ''}`}
      onClick={handleClickOnCell}
    >
      {editable && isEditing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Champ ${title} requis !`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        <>
          {dataIndex === 'action' ? (
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleDropdownClick,
              }}
              placement="bottomRight"
              arrow
            >
              <EllipsisOutlined />
            </Dropdown>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </td>
  );
};

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
