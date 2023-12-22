import classNames from 'classnames';
import { FC } from 'react';

import { AntdCheckOutlinedIcon, SecondaryButton } from '../..';
import { SaveProps, SavePropTypes } from '.';

const Save: FC<SaveProps> = ({ ...buttonProps }) => (
  <SecondaryButton
    icon={<AntdCheckOutlinedIcon />}
    {...buttonProps}
    className={classNames('twp-save', buttonProps.className)}
  />
);

Save.displayName = 'TwpSave';

Save.propTypes = SavePropTypes;

export default Save;
