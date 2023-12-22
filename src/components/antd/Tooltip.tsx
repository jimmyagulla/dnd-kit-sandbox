import 'antd/lib/tooltip/style';

import { Tooltip, TooltipProps } from 'antd';
import { FC } from 'react';

const AntdTooltip: FC<TooltipProps> = ({ ...tooltipProps }) => (
  <Tooltip {...tooltipProps} />
);

AntdTooltip.displayName = 'AntdTooltip';

export default AntdTooltip;
