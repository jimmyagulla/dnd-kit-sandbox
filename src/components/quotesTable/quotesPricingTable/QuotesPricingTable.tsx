import './QuotesPricingTable.scss';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { FC, useCallback, useMemo } from 'react';

import { Quote } from '../../../types';
import { currencyFormat } from '../../../lib';
import { AntdSpace, AntdTooltip } from '../../antd';
import {
  quotesPricingTableColumns,
  QuotesPricingTableProps,
  QuotesPricingTablePropTypes,
  VatDetail,
} from '.';

const QuotesPricingTable: FC<QuotesPricingTableProps> = ({
  dataSource,
  vats,
}) => {
  const getVatDetails = useCallback((): VatDetail[] => {
    const vatsDetails: VatDetail[] = [];

    dataSource
      .filter((quote) => quote?.tva && quote?.total)
      .forEach((quote: Quote): void => {
        const rate = Number(
          vats.find((vat) => vat.id === Number(quote?.tva))?.tva,
        );
        const baseAmount = Number(quote?.total);
        const tvaAmount = baseAmount * (rate / 100);

        const vatDetailExists = vatsDetails.find(
          (vatDetail) => vatDetail.id === rate,
        );

        if (vatDetailExists) {
          vatDetailExists.baseAmount += baseAmount;
          vatDetailExists.tvaAmount += tvaAmount;
        } else {
          vatsDetails.push({
            baseAmount,
            id: rate,
            rate,
            tvaAmount,
          });
        }
      });

    return vatsDetails;
  }, [dataSource, vats]);

  const htTotal = useMemo(() => {
    return dataSource.reduce((acc, quote) => {
      return Number(acc) + (Number(quote.total) || 0);
    }, 0);
  }, [dataSource]);

  const vatsDetails: VatDetail[] = useMemo(() => {
    return getVatDetails();
  }, [getVatDetails]);

  const tvaAmount = useMemo(() => {
    return vatsDetails.reduce((acc, vatDetail) => {
      return Number(acc) + (Number(vatDetail.tvaAmount) || 0);
    }, 0);
  }, [vatsDetails]);

  const ttcTotal = Number(htTotal) + Number(tvaAmount);

  const toolTtipTitle = useCallback(() => {
    return (
      <span>Message</span>
    );
  }, []);

  return (
    <AntdSpace className="quotes-pricing-table" direction="vertical">
      <div className="ht-total">
        <span>Total HT</span>
        <span>{currencyFormat(Number(htTotal))} €</span>
      </div>
      <div className="tva-total">
        <span>Total TVA</span>
        <span>{currencyFormat(Number(tvaAmount))} €</span>
      </div>
      <div className="ttc-total">
        <span>Total TTC</span>
        <span>{currencyFormat(Number(ttcTotal))} €</span>
      </div>
      <div className="tva-table-wrapper">
        <AntdSpace>
          <span className="tva-text">TVA</span>
          <AntdTooltip title={toolTtipTitle}>
            <InfoCircleOutlined />
          </AntdTooltip>
        </AntdSpace>
        <Table<VatDetail>
          columns={quotesPricingTableColumns()}
          dataSource={vatsDetails}
          pagination={false}
          scroll={{ x: 200 }}
        />
      </div>
    </AntdSpace>
  );
};

QuotesPricingTable.displayName = 'QuotesPricingTable';

QuotesPricingTable.propTypes = QuotesPricingTablePropTypes;

export default QuotesPricingTable;
