import './SquareButtonWithIcon.scss';

import classNames from 'classnames';
import { FC } from 'react';

import { AntdPlusOutlinedIcon, PrimaryButton } from '../..';
import { SquareButtonWithIconProps, SquareButtonWithIconPropTypes } from '.';

const SquareButtonWithIcon: FC<SquareButtonWithIconProps> = ({
  ...buttonProps
}) => (
  <PrimaryButton
    {...buttonProps}
    className={classNames('twp-square-button-with-icon', buttonProps.className)}
  />
);

SquareButtonWithIcon.defaultProps = {
  icon: <AntdPlusOutlinedIcon />,
};

SquareButtonWithIcon.displayName = 'TwpSquareButtonWithIcon';

SquareButtonWithIcon.propTypes = SquareButtonWithIconPropTypes;

export default SquareButtonWithIcon;
