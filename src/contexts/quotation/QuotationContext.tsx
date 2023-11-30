import { createContext, FC } from 'react';

import {
  QuotationContextProps,
  QuotationContextPropTypes,
  QuotationProviderProps,
} from '.';

export const QuotationContext = createContext<QuotationContextProps>({});

export const QuotationProvider: FC<QuotationProviderProps> = ({
  children,
}) => {
  return (
    <QuotationContext.Provider value={{}}>
      {children}
    </QuotationContext.Provider>
  );
};

QuotationProvider.displayName = 'TwpQuotationContext';

QuotationProvider.propTypes = QuotationContextPropTypes;
