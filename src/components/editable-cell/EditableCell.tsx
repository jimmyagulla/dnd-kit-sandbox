import './EditableCell.scss';

import {
  FC,
  useContext,
  useState,
  useEffect,
  RefObject,
  useRef
} from 'react';
import { InputRef, Input, InputNumber, Form, Dropdown, MenuProps } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  EnterOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

import { QuotationContext } from '../../contexts';
import { Item } from '../../types';
import {
  EditableCellProps,
  EditableCellPropTypes,
  QuotationTableDropdownActions,
} from '.';

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
  children,
  dataIndex,
  editable,
  index,
  inputType,
  record,
  title,
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

EditableCell.displayName = 'EditableCell';

EditableCell.propTypes = EditableCellPropTypes;

export default EditableCell;