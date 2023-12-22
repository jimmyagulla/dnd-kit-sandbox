import { ReactElement } from 'react';

import { Entity } from '../../../types';
import {
  AntdButton,
  AntdDeleteOutlinedIcon,
  AntdSpace,
  Cancel,
  Save,
} from '../..';
import { ActionButtonsTableProps, ActionButtonsTablePropTypes } from '.';

function ActionButtonsTable<T extends Entity>({
  record,
  cloningRowsId,
  onDeleteCloningRow,
  isWaitingForEditResponse,
  keepEditingModeOpen,
  setIsCurrentAdding,
  setEditingEntityId,
  onSave,
  isAdding,
}: ActionButtonsTableProps<T>): ReactElement {
  if (record && cloningRowsId?.includes(record.id)) {
    return (
      <AntdSpace className="action-buttons-table">
        <AntdButton
          className="action-btn-delete"
          color="primary"
          icon={<AntdDeleteOutlinedIcon />}
          onClick={(): void => {
            if (!record) {
              return;
            }

            onDeleteCloningRow?.(record);
          }}
          size="middle"
        />
      </AntdSpace>
    );
  }

  return (
    <AntdSpace>
      <Save
        loading={isWaitingForEditResponse}
        onClick={(): void => {
          onSave(record).catch((e) => {
            console.error(e);
          });

          if (isAdding) {
            setIsCurrentAdding(false);
          }

          if (!keepEditingModeOpen) setEditingEntityId(undefined);
        }}
      />
      <Cancel
        onClick={(): void => {
          setEditingEntityId(undefined);
          setIsCurrentAdding(false);
        }}
      />
    </AntdSpace>
  );
}

ActionButtonsTable.displayName = 'TwpActionButtonsTable';

ActionButtonsTable.propTypes = ActionButtonsTablePropTypes;

export default ActionButtonsTable;
