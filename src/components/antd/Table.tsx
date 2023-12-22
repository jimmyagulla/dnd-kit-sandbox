import 'antd/lib/table/style';

import { Table, TableProps } from 'antd';
import { ReactElement } from 'react';

import { Entity } from '../../types';

/**
 * @param {TableProps} tableProps
 * @return {ReactElement}
 */
function AntdTable<T extends Entity>({
  ...tableProps
}: Omit<TableProps<T>, 'footer'>): ReactElement {
  return <Table<T> rowKey="id" showSorterTooltip={false} {...tableProps} />;
}

AntdTable.defaultProps = {
  emptyProps: {
    description: 'Aucun élément',
  },
};

AntdTable.displayName = 'AntdTable';

export default AntdTable;
