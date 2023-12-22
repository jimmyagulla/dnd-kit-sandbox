import './AddingRow.scss';

import { ReactElement } from 'react';

import { Entity } from '../../../types';
import { AntdTableSummary } from '../..';
import { AddingRowProps, AddingRowPropTypes } from '.';

function AddingRow<T extends Entity, AddingForm = void>({
  columns,
  hasRowSelection,
}: AddingRowProps<T, AddingForm>): ReactElement {
  return (
    <AntdTableSummary fixed="top">
      <AntdTableSummary.Row>
        {hasRowSelection && (
          <AntdTableSummary.Cell
            key="add-selection-column"
            className="twp-editable-cell ant-table-selection-column"
            index={columns.length + 1}
          />
        )}
        {columns.map((column, index) => (
          <AntdTableSummary.Cell
            key={`add-${column.key || ''}`}
            className="twp-editable-cell"
            index={index}
          >
            {column.editingRender ? column.editingRender() : <div />}
          </AntdTableSummary.Cell>
        ))}
      </AntdTableSummary.Row>
    </AntdTableSummary>
  );
}

AddingRow.displayName = 'TwpAddingRow';
AddingRow.defaultProps = { hasRowSelection: false };

AddingRow.propTypes = AddingRowPropTypes;

export default AddingRow;
