import PropTypes from 'prop-types';

import { Nullable } from '../../../types';
import { AntdButtonProps } from '../..';

export type SeeMoreProps = {
  elementCount?: Nullable<number>;
  elementName?: Nullable<string>;
  elementNamePluralized?: Nullable<string>;
} & AntdButtonProps;

export const SeeMorePublicPropTypes = {
  elementCount: PropTypes.number,
  elementName: PropTypes.string,
  elementNamePluralized: PropTypes.string,
};

export const SeeMorePropTypes = {
  ...SeeMorePublicPropTypes,
};
