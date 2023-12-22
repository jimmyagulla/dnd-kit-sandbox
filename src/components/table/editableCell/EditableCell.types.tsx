import { FormInstance } from 'antd';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

import { Entity, Nullable } from '../../../types';
import { AntdColumnProps } from '../..';

export type EditableCellProps<T extends Entity, EditingForm> = {
  className: AntdColumnProps<T>['className'];
  editingRender: (
    record?: T,
    index?: number,
    form?: FormInstance<Record<string | number, EditingForm>>,
  ) => ReactNode;
  isEditing?: Nullable<boolean>;
  key: AntdColumnProps<T>['key'];
  onCellClick?: (record: T) => void;
  record: T;
};

export const EditableCellPropTypes = {
  className: PropTypes.string,
  editingRender: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  key: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]).isRequired,
  onCellClick: PropTypes.func,
  record: PropTypes.any.isRequired,
};
