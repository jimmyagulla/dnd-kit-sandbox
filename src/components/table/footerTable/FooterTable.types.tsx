import PropTypes from 'prop-types';

import { Nullable } from '../../../types';

export type FooterTableProps = {
  isWaitingForActionResponse?: Nullable<boolean>;
  onCancel?: () => void;
  onSubmit?: () => void;
};

export const FooterTablePropTypes = {
  isWaitingForActionResponse: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};
