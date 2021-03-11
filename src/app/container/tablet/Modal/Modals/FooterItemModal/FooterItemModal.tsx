import React from 'react';
import { Typography } from '@material-ui/core';
import ReactQuill, { Quill } from 'react-quill';
import {
  FooterItemModalPresenterProps,
  useFooterItemModalProps,
} from './useFooterItemModalProps';

export const FooterItemModalPresenter: React.FC<FooterItemModalPresenterProps> = (
  props
) => {
  return (
    <>
      <Typography variant="body1">
        <ReactQuill
          readOnly
          theme="bubble"
          value={props.footerItem.item_content}
        />
      </Typography>
    </>
  );
};

const FooterItemModal = () => {
  const props = useFooterItemModalProps();

  return <FooterItemModalPresenter {...props} />;
};

export default FooterItemModal;
