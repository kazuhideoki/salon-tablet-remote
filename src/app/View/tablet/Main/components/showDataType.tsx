import React from 'react'
import {
  T_data_type_article,
  T_data_type_footer_item,
} from "../../../../Store/Interface";
import { Chip } from "@material-ui/core";

export const showDataType = (dataType: T_data_type_article | T_data_type_footer_item, className?: string, isSizeSmall?: boolean) => {

  let chip: JSX.Element
  switch (dataType) {
    case 'sample_data':
      chip = (<Chip label='Sample' size={isSizeSmall ? 'small' : 'medium'}/>)
      break
    case 'web_article':
      chip = <Chip label="Web記事" size={isSizeSmall ? "small" : "medium"} />;
      break
    default:
      // chip = <Chip label="デフォルト" />;
  }

  return <div className={className}>{chip}</div>
}