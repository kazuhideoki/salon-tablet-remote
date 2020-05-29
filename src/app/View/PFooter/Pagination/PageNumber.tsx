import React from 'react'
import { Store } from '../../../Store/Store';

type Props = {
  className?: string
}

export const PageNumber = ({ className}: Props) => {
  const { paginationParams } = React.useContext(Store);

  return (
    <p className={className}>
      【 {paginationParams.page}/{paginationParams.pageCount} 】
    </p>
  );
};
