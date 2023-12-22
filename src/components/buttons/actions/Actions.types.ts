import PropTypes from 'prop-types';

import { Nullable } from '../../../types';
import { AntdButtonProps, AntdDividerProps, AntdPopoverProps } from '../..';

export type ActionButtonsProps = (AntdButtonProps | AntdDividerProps)[];

export type ActionsProps = {
  actionButtonsProps?: Nullable<ActionButtonsProps>;
  deleteInfoMessage?: Nullable<string>;
  popoverProps?: Nullable<AntdPopoverProps>;
} & AntdButtonProps;

export const ActionButtonPropTypes = {};

export const ActionsPublicPropTypes = {
  actionButtonsProps: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape(ActionButtonPropTypes).isRequired,
      PropTypes.object.isRequired,
    ]).isRequired,
  ),
  deleteInfoMessage: PropTypes.string,
  popoverProps: PropTypes.object,
};

export const ActionPropTypes = {
  ...ActionsPublicPropTypes,
};
