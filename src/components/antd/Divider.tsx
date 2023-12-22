import 'antd/lib/divider/style';

import { Divider } from 'antd';
import { DividerProps } from 'antd/lib/divider';
import { FC } from 'react';

const AntdDivider: FC<DividerProps> = Divider;

AntdDivider.displayName = 'AntdDivider';

export default AntdDivider;
