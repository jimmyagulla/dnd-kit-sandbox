/* eslint-disable max-lines */
import './Table.scss';

import classNames from 'classnames';
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Entity } from '../../types';
import { putElementsFirst } from '../../utils';
import {
  ActionButtonsProps,
  Actions,
  AntdButtonProps,
  AntdEmpty,
  AntdForm,
  AntdSkeleton,
  AntdTable,
  AntdUseForm,
  EditableCellProps,
  IoDuplicateOutlineIcon,
  SeeMore,
  SquareButtonWithIcon,
  TableColumnProps,
} from '..';
import {
  ActionButtonsTable,
  AddingRow,
  EditableCell,
  FooterTable,
  TableProps,
  TablePropTypes,
} from '.';

function Table<T extends Entity, EditingForm = void>({
  actionProps,
  columns,
  dataSource,
  emptyProps,
  isLoading,
  isAdding,
  isWaitingForActionResponse,
  isRowDeletable,
  isRowEditable,
  limit,
  cloningRowsId,
  onAdd,
  onStartCloning,
  onDelete,
  onDeleteCloningRow,
  keepEditingModeOpen,
  onSubmit,
  onCancel,
  onEdit,
  hasFooter,
  rowSelection,
  editingRecordId,
  customForm,
  interactive,
  customActionButtons,
  findRecordMethod,
  ...antdTableProps
}: TableProps<T, EditingForm>): ReactElement {
  const [displayCount, setDisplayCount] = useState(limit);
  const [enhancedColumns, setEnhancedColumns] =
    useState<TableProps<T, EditingForm>['columns']>(columns);
  const [editingEntityId, setEditingEntityId] = useState<T['id']>();
  const [form] = AntdUseForm<Record<string | number, EditingForm>>(customForm || undefined);
  const [isWaitingForEditResponse, setIsWaitingForEditResponse] =
    useState<AntdButtonProps['loading']>(false);
  const [isCurrentAdding, setIsCurrentAdding] = useState(isAdding || false);
  const isDisabledBtn =
    isCurrentAdding || !!editingEntityId || !!cloningRowsId?.length;

  const cancelEdit = useCallback((): void => {
    setEditingEntityId(undefined);
    form.resetFields();
  }, [form]);

  useEffect((): void => {
    setEditingEntityId(editingRecordId || undefined);
  }, [editingRecordId]);

  const onSave = useCallback(
    async (record?: T): Promise<void> => {
      const validatedForm = await form.validateFields();
      const values: EditingForm[] = Object.values(validatedForm);

      setIsWaitingForEditResponse(true);

      if (record && onEdit) {
        Promise.resolve(onEdit(values[0], record))
          .then(() => setIsWaitingForEditResponse(false))
          .catch((e) => console.error(e));

        return;
      }

      if (onAdd) {
        Promise.resolve(onAdd(values[0]))
          .then(() => setIsWaitingForEditResponse(false))
          .catch((e) => console.error(e));
      }
    },
    [form, onAdd, onEdit],
  );

  const actionEditingRender = useCallback(
    (record?: T): ReactNode => (
      <ActionButtonsTable
        cloningRowsId={cloningRowsId}
        isAdding={isAdding}
        isWaitingForEditResponse={isWaitingForEditResponse}
        keepEditingModeOpen={keepEditingModeOpen}
        onDeleteCloningRow={onDeleteCloningRow}
        onSave={onSave}
        record={record}
        setEditingEntityId={setEditingEntityId}
        setIsCurrentAdding={setIsCurrentAdding}
      />
    ),

    [
      cloningRowsId,
      isAdding,
      isWaitingForEditResponse,
      keepEditingModeOpen,
      onDeleteCloningRow,
      onSave,
    ],
  );

  const addingRow = useCallback(
    (): ReactNode =>
      enhancedColumns ? (
        <AddingRow columns={enhancedColumns} hasRowSelection={!!rowSelection} />
      ) : (
        <div />
      ),
    [enhancedColumns, rowSelection],
  );

  const actionColumnRender = useCallback(
    (_: any, record: T): ReactNode => {
      const actionButtonsFromProps: ActionButtonsProps = [];

      
      if (actionProps && actionProps.actionButtonsProps) {
        actionButtonsFromProps.push(...actionProps.actionButtonsProps(record));
      }

      if (onEdit) {
        actionButtonsFromProps.push({
          children: customActionButtons?.editButton || 'Éditer',
          disabled: isRowEditable ? !isRowEditable(record) : false,
          onClick: (): void => {
            setIsCurrentAdding(false);
            setEditingEntityId(record.id);

            form.resetFields();
          },
        });
      }

      if (onDelete) {
        actionButtonsFromProps.push({
          children: customActionButtons?.deleteButton || 'Supprimer',
          disabled: isRowDeletable ? !isRowDeletable(record) : false,
          onClick: (): void => {
            onDelete(record);
          },
        });
      }

      return (
        <Actions
          disabled={isDisabledBtn}
          size="small"
          {...actionProps}
          actionButtonsProps={actionButtonsFromProps}
        />
      );
    },
    [actionProps, onEdit, onDelete, isDisabledBtn, customActionButtons?.editButton, customActionButtons?.deleteButton, isRowEditable, form, isRowDeletable],
  );

  const onCellClick = useCallback((record: T): void => {
    setEditingEntityId(record.id);
  }, []);

  useEffect((): void => {
    if (!columns) {
      return;
    }

    let newEnhancedColumns = [...columns];

    const shouldHaveActionButton = actionProps || onEdit || onDelete;

    if (shouldHaveActionButton || onAdd || onStartCloning) {
      newEnhancedColumns.push({
        className: 'twp-table-actions',
        dataIndex: 'id',
        editingRender: actionEditingRender,
        fixed: 'right',
        key: 'action',
        render: shouldHaveActionButton ? actionColumnRender : undefined,
        title:
          (
            <div className="action-buttons">
              {onAdd && (
                <SquareButtonWithIcon
                  disabled={isDisabledBtn}
                  onClick={(): void => {
                    setIsCurrentAdding(true);
                    setEditingEntityId(undefined);

                    form.resetFields();
                  }}
                />
              )}
              {onStartCloning && (
                <SquareButtonWithIcon
                  disabled={isDisabledBtn}
                  icon={<IoDuplicateOutlineIcon />}
                  onClick={onStartCloning}
                />
              )}
            </div>
          ) || 'Actions',
        width: 80,
      });
    }

    newEnhancedColumns = newEnhancedColumns.map(
      (column): TableColumnProps<T, EditingForm> => {
        const { className, editingRender, key } = column;

        column.onCell = (
          record: T,
          index?: number,
        ): EditableCellProps<T, EditingForm> => ({
          className,
          editingRender: (_record: any): ReactNode =>
            editingRender?.(_record, index, form),
          isEditing:
            (editingEntityId && record.id === editingEntityId) ||
            cloningRowsId?.includes(record.id),
          key,
          onCellClick: interactive ? onCellClick : undefined,
          record,
        });

        return column;
      },
    );

    setEnhancedColumns(newEnhancedColumns);
  }, [
    actionColumnRender,
    actionEditingRender,
    actionProps,
    columns,
    editingEntityId,
    form,
    isCurrentAdding,
    onStartCloning,
    onAdd,
    onDelete,
    onEdit,
    cloningRowsId,
    isDisabledBtn,
    interactive,
    onCellClick,
  ]);

  useEffect(() => {
    const handleKeyboardEvents = (event: KeyboardEvent): void => {
      const record = findRecordMethod
        ? findRecordMethod(String(editingEntityId), dataSource)
        : dataSource?.find((data: any) => data.id === editingEntityId);

      (async (): Promise<void> => {
        const isPressingCtrl = event.ctrlKey || event.metaKey || event.shiftKey;

        switch (event.key) {
          case 'Escape':
            cancelEdit();
            break;
          case 'Enter':
            if (isPressingCtrl) return;

            setEditingEntityId(undefined);
            setIsCurrentAdding(false);
            
            return onSave(record);
          default:
            break;
        }

        return Promise.resolve();
      })().catch((e) => console.error(e));
    };

    if (interactive) {
      window.addEventListener('keydown', handleKeyboardEvents);
    }

    return () => {
      if (interactive) {
        window.removeEventListener('keydown', handleKeyboardEvents);
      }
    };
  }, [interactive, cancelEdit, onSave, dataSource, editingEntityId]);

  const renderFooter = (): ReactElement => (
    <FooterTable
      isWaitingForActionResponse={!!isWaitingForActionResponse}
      onCancel={(): void => onCancel?.()}
      onSubmit={(): void => onSubmit?.(form)}
    />
  );

  const emptyText = (
    <AntdSkeleton loading={isLoading || false}>
      <AntdEmpty description={'Aucun élément'} {...emptyProps} />
    </AntdSkeleton>
  );

  const hasUndisplayedData = (dataSource?.length || 0) > (displayCount || 0);
  const isOverDataLimit = limit && (dataSource?.length || 0) > limit;

  if (dataSource && hasUndisplayedData && rowSelection?.selectedRowKeys) {
    dataSource = putElementsFirst(dataSource, rowSelection.selectedRowKeys as any);
  }

  return (
    <AntdForm component={false} form={form}>
      <AntdTable<T>
        columns={enhancedColumns}
        components={{ body: { cell: EditableCell } }}
        dataSource={
          displayCount ? dataSource?.slice(0, displayCount) : dataSource
        }
        footer={hasFooter ? renderFooter : undefined}
        locale={{ emptyText }}
        rowSelection={!editingEntityId ? rowSelection : undefined}
        sticky
        summary={isCurrentAdding ? addingRow : undefined}
        {...antdTableProps}
        className={classNames(
          'twp-table',
          antdTableProps.onRow ? 'twp-clickable-row' : '',
          isCurrentAdding ? 'twp-has-adding-row' : '',
          antdTableProps.className,
        )}
      />
      {isOverDataLimit && (
        <SeeMore
          onClick={(): void =>
            setDisplayCount(hasUndisplayedData ? dataSource?.length : limit)
          }
        >
          {!hasUndisplayedData ? 'Voir moins' : undefined}
        </SeeMore>
      )}
    </AntdForm>
  );
}

Table.displayName = 'TwpTable';

Table.propTypes = TablePropTypes;

export default Table;
