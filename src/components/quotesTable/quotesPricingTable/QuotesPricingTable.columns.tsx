import { currencyFormat } from '../../../lib';
import { TableColumnProps } from '../..';
import { VatDetail } from '..';

export const quotesPricingTableColumns = (): TableColumnProps<VatDetail>[] => {
  return [
    {
      dataIndex: 'rate',
      title: 'Taux',
      width: '30%',
      render: (rate: number): string => {
        return `${rate} %`;
      },
    },
    {
      dataIndex: 'baseAmount',
      title: 'Base',
      width: '35%',
      render: (baseAmount: number): string => {
        return `${currencyFormat(Number(baseAmount))} €`;
      },
    },
    {
      dataIndex: 'tvaAmount',
      title: 'Montant TVA',
      width: '35%',
      render: (tvaAmount: number): string => {
        return `${currencyFormat(Number(tvaAmount))} €`;
      },
    },
  ];
};
