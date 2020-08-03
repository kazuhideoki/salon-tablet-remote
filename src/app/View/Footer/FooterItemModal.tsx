import React from "react";
import { Store } from "../../Store/Store";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import ReactQuill, { Quill } from "react-quill";

const useFooterItemModalProps = () => {
  const { appState } = React.useContext(Store);
  const footerItem = appState.currentModalContent.footerItem;

  return {
    footerItem,
  };
};

export type TFooterItemModalProps = ReturnType<typeof useFooterItemModalProps>;

const useStyles = makeStyles((theme) => createStyles({}));

export const FooterItemModalPresenter: React.FC<TFooterItemModalProps> = (props) => {
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
