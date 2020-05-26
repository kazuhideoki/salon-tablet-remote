import React from 'react'
import { Store } from '../../../Store/Store';

type Props = {
  classes?: any
}

export const PageNumber = ({classes}: Props) => {
  const { paginationParams } = React.useContext(Store);

  return (
    <p className={classes.nums}>
      【 {paginationParams.page}/{paginationParams.pageCount} 】
    </p>
  );
};
