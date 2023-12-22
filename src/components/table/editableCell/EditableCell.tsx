import './EditableCell.scss';

import { Button } from 'antd';
import classNames from 'classnames';
import { PropsWithChildren, ReactElement } from 'react';

import { Entity } from '../../../types';
import { EditableCellProps, EditableCellPropTypes } from '.';

function EditableCell<T extends Entity, EditingForm>({
  editingRender,
  children,
  className,
  isEditing,
  record,
  onCellClick,
  ...rest
}: PropsWithChildren<EditableCellProps<T, EditingForm>>): ReactElement {
  if (onCellClick) {
    return (
      <td
        {...rest}
        className={classNames('twp-editable-cell-interactive', className)}
      >
        <Button
          className="twp-interactive-button"
          onClick={(): void => onCellClick(record)}
          type="link"
        >
          {isEditing ? editingRender(record) : children}
        </Button>
      </td>
    );
  }

  return (
    <td {...rest} className={classNames('twp-editable-cell', className)}>
      {isEditing ? editingRender(record) : children}
    </td>
  );
}

EditableCell.displayName = 'TwpEditableCell';

EditableCell.propTypes = EditableCellPropTypes;

export default EditableCell;
