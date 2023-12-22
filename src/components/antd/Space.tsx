import 'antd/lib/space/style';

import { Space, SpaceProps } from 'antd';
import { FC } from 'react';

const AntdSpace: FC<SpaceProps> = ({ ...spaceProps }) => (
  <Space {...spaceProps} />
);

AntdSpace.displayName = 'AntdSpace';

export default AntdSpace;
