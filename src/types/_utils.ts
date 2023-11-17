import PropTypes from 'prop-types';

export type Nullable<T> = T | null;

export const PropTypesKey = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
]);
