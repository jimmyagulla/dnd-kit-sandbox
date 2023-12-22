import './Actions.scss';

import classNames from 'classnames';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  AntdButton,
  AntdButtonProps,
  AntdDivider,
  AntdEllipsisOutlinedIcon,
  AntdPopover,
  AntdSpace,
  SecondaryButton,
} from '../..';
import { ActionPropTypes, ActionsProps } from '.';

const Actions: FC<ActionsProps> = ({
  actionButtonsProps,
  deleteInfoMessage,
  popoverProps,
  ...buttonProps
}) => {
  const [isOpened, setIsOpened] = useState(popoverProps?.open || false);

  const ActionButton: FC<AntdButtonProps> = useCallback(
    ({ ...antdButtonProps }) => (
      <>
        <AntdButton
          type="text"
          {...antdButtonProps}
          onClick={(
            e: MouseEvent<HTMLAnchorElement & HTMLButtonElement>,
          ): void => {
            setIsOpened(false);

            antdButtonProps.onClick?.(e);

            return undefined;
          }}
        />
        {String(antdButtonProps.children) === 'Supprimer' && deleteInfoMessage ? (
          <span className="delete-info-msg">({deleteInfoMessage})</span>
        ) : undefined}
      </>
    ),
    [deleteInfoMessage],
  );

  return (
    <AntdPopover
      content={
        <AntdSpace direction="vertical">
          {actionButtonsProps?.map((buttonOrDividerProps: any) => {
            const isAntdButtonProps = (
              props: unknown,
            ): props is AntdButtonProps => {
              return !!(props as AntdButtonProps).onClick;
            };

            if (isAntdButtonProps(buttonOrDividerProps)) {
              return <ActionButton key={uuidv4()} {...buttonOrDividerProps} />;
            }

            return <AntdDivider key={uuidv4()} {...buttonOrDividerProps} />;
          })}
        </AntdSpace>
      }
      onOpenChange={setIsOpened}
      open={isOpened}
      overlayClassName={classNames(
        'twp-actions',
        popoverProps?.overlayClassName,
      )}
      trigger="click"
      {...popoverProps}
    >
      <SecondaryButton
        icon={<AntdEllipsisOutlinedIcon />}
        onClick={(e: MouseEvent): void => {
          e.stopPropagation();
          setIsOpened(true);
        }}
        {...buttonProps}
      />
    </AntdPopover>
  );
};

Actions.displayName = 'TwpActions';

Actions.propTypes = ActionPropTypes;

export default Actions;
