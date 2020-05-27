import React from 'react'
import { Store } from '../../Store/Store'
import { makeStyles, createStyles } from '@material-ui/core'
import ReactQuill, { Quill }from "react-quill";


const useStyles = makeStyles((theme) =>
  createStyles({

  })
)

export const ContentModal = () => {
  const { appState } = React.useContext(Store)
  return (
    // <div
    //   dangerouslySetInnerHTML={{
    //     __html: appState.articleContentModal,
    //   }}
    // />
    <ReactQuill readOnly theme='bubble' value={appState.ContentModal}/>
  );
}

export default ContentModal;