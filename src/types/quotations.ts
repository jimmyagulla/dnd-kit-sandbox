import { Key } from "react"

export interface Quotation {
  id: Key;
  createdAt: string;
  updatedAt: string;
  number: string;
  organizationId: Key;
  clientId: Key;
  siteId: Key;
  annotation: string;
  title: string;
  executionDelayId: Key;
  offerValidityId: Key;
  signatoryId: Key;
  paymentTermsId: Key;
  typeQuotationId: Key;
};
