import { FC } from 'react';

import { AntdSpace, PrimaryButton, SecondaryButton } from '../..';
import { FooterTableProps, FooterTablePropTypes } from './FooterTable.types';

const FooterTable: FC<FooterTableProps> = ({
  onCancel,
  onSubmit,
  isWaitingForActionResponse,
}) => {
  return (
    <AntdSpace className="twp-columns-panel-footer">
      <SecondaryButton htmlType="button" onClick={onCancel} size="large">
        Annuler
      </SecondaryButton>
      <PrimaryButton
        htmlType="submit"
        loading={!!isWaitingForActionResponse}
        onClick={onSubmit}
        size="large"
      >
        Valider
      </PrimaryButton>
    </AntdSpace>
  );
};

FooterTable.propTypes = FooterTablePropTypes;

export default FooterTable;
