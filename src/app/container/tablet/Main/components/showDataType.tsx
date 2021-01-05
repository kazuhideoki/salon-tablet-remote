import React from 'react';
import {
  T_data_type_article,
  T_data_type_footer_item,
} from '../../../../../util/interface/Interface';
import { Chip } from '@material-ui/core';

export const showDataType = (
  dataType: T_data_type_article | T_data_type_footer_item,
  className?: string,
  isSizeSmall?: boolean
) => {
  const chip: JSX.Element = (() => {
    switch (dataType) {
      case 'sample_data':
        return <Chip label="Sample" size={isSizeSmall ? 'small' : 'medium'} />;
      case 'web_article':
        return <Chip label="Web記事" size={isSizeSmall ? 'small' : 'medium'} />;
      default:
        return <></>;
    }
  })();

  return <div className={className}>{chip}</div>;
};
