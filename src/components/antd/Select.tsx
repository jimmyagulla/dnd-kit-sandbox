import 'antd/lib/select/style';

import { Select } from 'antd';
import { BaseOptionType, SelectProps, SelectValue } from 'antd/lib/select';
import { BaseSelectRef } from 'rc-select';
import { DefaultOptionType } from 'rc-select/lib/Select';
import React, { ReactElement, Ref } from 'react';

function Component<
  ValueType = SelectValue,
  OptionType extends BaseOptionType = DefaultOptionType,
>(
  { ...selectProps }: SelectProps<ValueType, OptionType>,
  ref?: Ref<BaseSelectRef>,
): ReactElement {
  return <Select ref={ref} {...selectProps} />;
}

const AntdSelect = React.forwardRef(Component) as <
  ValueType,
  OptionType extends BaseOptionType,
>(
  props: SelectProps<ValueType, OptionType> & {
    ref?: React.ForwardedRef<BaseSelectRef>;
  },
) => ReturnType<typeof Component>;

export default AntdSelect;
