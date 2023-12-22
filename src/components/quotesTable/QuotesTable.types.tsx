import PropTypes from 'prop-types';

export type QuotesTableProps = {
  getAutocompleteUrl: string;
  updateQuotationUrl: string;
};

export const QuotesTablePublicPropTypes = {
  getAutocompleteUrl: PropTypes.string.isRequired,
  updateQuotationUrl: PropTypes.string.isRequired,
};

export const QuotesTablePropTypes = {
  ...QuotesTablePublicPropTypes,
};
