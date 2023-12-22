import PropTypes from 'prop-types';

export type Nullable<T> = T | null;

export const PropTypesKey = PropTypes.oneOfType([
  PropTypes.number.isRequired,
  PropTypes.string.isRequired,
]);

export interface Entity {
  createdAt?: Nullable<string>;
  id: string | number;
  updatedAt?: Nullable<string>;
}

export const PropTypesEntity = {
  createdAt: PropTypes.string,
  id: PropTypesKey.isRequired,
  updatedAt: PropTypes.string,
};