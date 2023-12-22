import 'antd/lib/button/style';

import { Button, ButtonProps } from 'antd';
import { FC, MouseEvent } from 'react';

const AntdButton: FC<ButtonProps> = ({ ...buttonProps }) => (
  <Button
    {...buttonProps}
    onClick={(e: MouseEvent<HTMLAnchorElement & HTMLButtonElement>): void => {
      e.stopPropagation();

      if (buttonProps.disabled) {
        return;
      }

      buttonProps.onClick?.(e);
    }}
  />
);

AntdButton.displayName = 'AntdButton';

export default AntdButton;
