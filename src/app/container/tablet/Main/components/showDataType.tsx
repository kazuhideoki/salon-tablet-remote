import React from 'react';
import {
  DataTypeArticle,
  DataTypeFooterItem,
} from '../../../../../util/interface/Interface';
import { Chip } from '@material-ui/core';

export const showDataType = (
  dataType: DataTypeArticle | DataTypeFooterItem,
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
