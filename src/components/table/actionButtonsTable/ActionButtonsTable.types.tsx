import PropTypes from 'prop-types';
import { Dispatch, SetStateAction } from 'react';

import { Entity, Nullable, PropTypesKey } from '../../../types';
import { AntdButtonProps } from '../..';

export type ActionButtonsTableProps<T extends Entity> = {
  cloningRowsId?: T['id'][];
  isAdding?: Nullable<boolean>;
  isWaitingForEditResponse: AntdButtonProps['loading'];
  keepEditingModeOpen?: Nullable<boolean>;
  onDeleteCloningRow?: Nullable<(record: any) => void>;
  onSave: (record: any) => Promise<void>;
  record?: T;
  setEditingEntityId: Dispatch<SetStateAction<T['id'] | undefined>>;
  setIsCurrentAdding: Dispatch<SetStateAction<boolean>>;
};

export const ActionButtonsTablePropTypes = {
  cloningRowsId: PropTypes.arrayOf(PropTypesKey.isRequired),
  isAdding: PropTypes.bool,
  isWaitingForEditResponse: PropTypes.bool.isRequired,
  keepEditingModeOpen: PropTypes.bool,
  onDeleteCloningRow: PropTypes.func,
  onSave: PropTypes.func.isRequired,
  record: PropTypes.any,
  setEditingEntityId: PropTypes.func.isRequired,
  setIsCurrentAdding: PropTypes.func.isRequired,
};
