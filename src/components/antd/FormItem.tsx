import 'antd/lib/form/style';

import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { FC } from 'react';

const FormItem: FC<FormItemProps> = ({ ...formItemProps }) => (
  <Form.Item
    rules={
      formItemProps.required
        ? [
            {
              required: true,
              message: `* requis`,
            },
          ]
        : undefined
    }
    {...formItemProps}
  />
);

FormItem.displayName = 'TwpFormItem';

export default FormItem;
