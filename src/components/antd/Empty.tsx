import 'antd/lib/empty/style';

import { Empty, EmptyProps } from 'antd';
import { FC } from 'react';

const AntdEmpty: FC<EmptyProps> = Empty;

AntdEmpty.displayName = 'AntdEmpty';

export default AntdEmpty;
