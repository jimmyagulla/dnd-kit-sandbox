import './SecondaryButton.scss';

import classNames from 'classnames';
import { FC } from 'react';

import { AntdButton } from '../..';
import { SecondaryButtonProps, SecondaryButtonPropTypes } from '.';

const SecondaryButton: FC<SecondaryButtonProps> = ({ ...buttonProps }) => (
  <AntdButton
    {...buttonProps}
    className={classNames('twp-secondary-button', buttonProps.className)}
  />
);

SecondaryButton.displayName = 'TwpSecondaryButton';

SecondaryButton.propTypes = SecondaryButtonPropTypes;

export default SecondaryButton;
