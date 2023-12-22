import 'antd/lib/form/style';

import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';
import { FC, ReactNode } from 'react';

const AntdForm: FC<
  FormProps & {
    children?: ReactNode;
  }
> = Form;

export const AntdUseForm = Form.useForm;
export const AntdUseWatch = Form.useWatch;

AntdForm.displayName = 'AntdForm';

export default AntdForm;
