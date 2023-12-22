import 'antd/lib/skeleton/style';

import { Skeleton, SkeletonProps } from 'antd';
import { ReactElement } from 'react';

const AntdSkeleton = ({ ...skeletonProps }: SkeletonProps): ReactElement => (
  <Skeleton {...skeletonProps} />
);

AntdSkeleton.displayName = 'AntdSkeleton';

export default AntdSkeleton;
