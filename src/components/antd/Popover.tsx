import 'antd/lib/popover/style';

import { Popover, PopoverProps } from 'antd';
import { FC } from 'react';

const AntdPopover: FC<PopoverProps> = ({ ...popoverProps }) => (
  <Popover {...popoverProps} />
);

AntdPopover.displayName = 'AntdPopover';

export default AntdPopover;
