import React from 'react';
import { LocalOffer } from '@material-ui/icons';

type Props = {
  className?: string;
};

export const TagsButton = ({ className }: Props) => {
  return <LocalOffer className={className ? className : ''} />;
};
