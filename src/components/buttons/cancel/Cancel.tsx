import classNames from 'classnames';
import { FC } from 'react';

import { AntdCloseOutlinedIcon, SecondaryButton } from '../..';
import { CancelProps, CancelPropTypes } from '.';

const Cancel: FC<CancelProps> = ({ ...buttonProps }) => (
  <SecondaryButton
    icon={<AntdCloseOutlinedIcon />}
    {...buttonProps}
    className={classNames('twp-cancel', buttonProps.className)}
  />
);

Cancel.displayName = 'TwpCancel';

Cancel.propTypes = CancelPropTypes;

export default Cancel;
