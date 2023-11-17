import './Quotation.scss';

import { FC } from 'react';

import { QuotationProps, QuotationPropTypes } from '.';

const Quotation: FC<QuotationProps> = (props) => {
  return <div>quotation</div>
};

Quotation.displayName = 'Quotation';

Quotation.propTypes = QuotationPropTypes;

export default Quotation;