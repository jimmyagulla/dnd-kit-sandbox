import 'antd/lib/input/style';

import { Input, InputProps } from 'antd';
import { forwardRef, ReactElement } from 'react';

/**
 * @param {InputProps} inputProps
 * @param {any} ref
 * @return {ReactElement}
 */
function Component({ ...inputProps }: InputProps, ref: any): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <Input ref={ref} {...inputProps} />;
}

const AntdInput = forwardRef<HTMLInputElement, InputProps>(Component);

AntdInput.displayName = 'AntdInput';

export default AntdInput;
