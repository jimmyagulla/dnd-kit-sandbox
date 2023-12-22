import './PrimaryButton.scss';

import classNames from 'classnames';
import { FC } from 'react';

import { AntdButton } from '../..';
import { PrimaryButtonProps, PrimaryButtonPropTypes } from '.';

const PrimaryButton: FC<PrimaryButtonProps> = ({ ...buttonProps }) => (
  <AntdButton
    type="primary"
    {...buttonProps}
    className={classNames('twp-primary-button', buttonProps.className)}
  />
);

PrimaryButton.displayName = 'TwpPrimaryButton';

PrimaryButton.propTypes = PrimaryButtonPropTypes;

export default PrimaryButton;
