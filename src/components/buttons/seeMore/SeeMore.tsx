import './SeeMore.scss';

import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

import { AntdButton } from '../..';
import { SeeMoreProps, SeeMorePropTypes } from '.';

const SeeMore: FC<PropsWithChildren<SeeMoreProps>> = ({
  children,
  elementCount,
  elementName,
  elementNamePluralized,
  ...buttonProps
}) => {
  if (typeof elementCount === 'number' && elementCount <= 0) {
    return <div />;
  }

  if (elementName && elementCount === 1) {
    children = `+ ${elementCount} ${elementName}`;
  }

  if (elementNamePluralized && elementCount && elementCount > 1) {
    children = `+ ${elementCount} ${elementNamePluralized}`;
  }

  return (
    <AntdButton
      {...buttonProps}
      className={classNames('twp-see-more', buttonProps.className)}
    >
      {children || 'Voir plus'}
    </AntdButton>
  );
};

SeeMore.propTypes = SeeMorePropTypes;

SeeMore.displayName = 'TwpSeeMore';

export default SeeMore;
