import { FormInstance } from 'antd';
import PropTypes from 'prop-types';

import { Entity, Nullable, PropTypesKey } from '../../types';
import {
  ActionButtonsProps,
  ActionPropTypes,
  ActionsProps,
  AntdColumnProps,
  AntdEmptyProps,
  AntdTableProps,
} from '..';
import { EditableCellProps } from '.';

export type EntityActionsProps<T> = Omit<ActionsProps, 'actionButtonsProps'> & {
  actionButtonsProps?: Nullable<(record: T) => ActionButtonsProps>;
};

export const EntityActionsPropTypes = {
  ...ActionPropTypes,
  actionButtonsProps: PropTypes.func,
};

export type TableColumnProps<T extends Entity, EditingForm = void> = Omit<
  AntdColumnProps<T>,
  'children'
> & {
  children?: Nullable<AntdColumnProps<T>[]>;
} & {
  editingRender?: Nullable<EditableCellProps<T, EditingForm>['editingRender']>;
};

export const TableColumnPropTypes = {
  editingRender: PropTypes.func,
};

export type TableColumnWithRequiredKeyWithoutChildrenProps<
  T extends Entity,
  EditingForm = void,
> = Omit<TableColumnProps<T, EditingForm>, 'children' | 'key'> & {
  key: string | number;
};

export type TableColumnWithRequiredKeyProps<
  T extends Entity,
  EditingForm = void,
> = TableColumnWithRequiredKeyWithoutChildrenProps<T, EditingForm> & {
  children?: Nullable<TableColumnWithRequiredKeyWithoutChildrenProps<T>[]>;
};

export type TableProps<T extends Entity, EditingForm = void> = Omit<
  AntdTableProps<T>,
  'columns'
> & {
  actionProps?: Nullable<EntityActionsProps<T>>;
  cloningRowsId?: T['id'][];
  columns?: TableColumnProps<T, EditingForm>[];
  customForm?: FormInstance<Record<string | number, EditingForm>>;
  editingRecordId?: Nullable<Entity['id']>;
  emptyProps?: Nullable<Partial<AntdEmptyProps>>;
  hasFooter?: Nullable<boolean>;
  interactive?: Nullable<boolean>;
  isAdding?: Nullable<boolean>;
  isLoading?: Nullable<boolean>;
  isRowDeletable?: Nullable<(record: T) => boolean>;
  isRowEditable?: Nullable<(record: T) => boolean>;
  isWaitingForActionResponse?: Nullable<boolean>;
  keepEditingModeOpen?: Nullable<boolean>;
  limit?: Nullable<number>;
  onAdd?: Nullable<(form: EditingForm) => Promise<void> | void>;
  onCancel?: () => void;
  onDelete?: Nullable<(record: T) => void>;
  onDeleteCloningRow?: Nullable<(record: T) => void>;
  onEdit?: Nullable<(form: EditingForm, record: T) => Promise<void> | void>;
  onStartCloning?: Nullable<() => void>;
  onSubmit?: Nullable<(form: FormInstance<Record<string | number, EditingForm>>) => void>;
};

export const TablePublicPropTypes = {
  actionProps: PropTypes.exact(EntityActionsPropTypes),
  cloningRowsId: PropTypes.arrayOf(PropTypesKey.isRequired),
  columns: PropTypes.arrayOf(PropTypes.exact(TableColumnPropTypes).isRequired),
  customForm: PropTypes.any,
  editingRecordId: PropTypesKey,
  emptyProps: PropTypes.object,
  hasFooter: PropTypes.bool,
  interactive: PropTypes.bool,
  isAdding: PropTypes.bool,
  keepEditingModeOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRowDeletable: PropTypes.func,
  isRowEditable: PropTypes.func,
  isWaitingForActionResponse: PropTypes.bool,
  limit: PropTypes.number,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteCloningRow: PropTypes.func,
  onStartCloning: PropTypes.func,
  onEdit: PropTypes.func,
};

export type TableWithRequiredKeysProps<
  T extends Entity,
  EditingForm = void,
> = Omit<TableProps<T, EditingForm>, 'columns'> & {
  columns?: TableColumnWithRequiredKeyProps<T, EditingForm>[];
};

export const TablePropTypes = {
  ...TablePublicPropTypes,
};
