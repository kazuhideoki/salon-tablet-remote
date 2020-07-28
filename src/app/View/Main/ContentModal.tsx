import React from 'react'
import { Store } from '../../Store/Store'
import { makeStyles, createStyles, Typography } from '@material-ui/core'
import ReactQuill, { Quill }from "react-quill";

const useContentModalProps = () => {
  const { appState } = React.useContext(Store)

  return {
    appState
  }
}

export type TContentModalProps = ReturnType<typeof useContentModalProps>

const useStyles = makeStyles((theme) =>
  createStyles({

  })
)

export const ContentModalPresenter: React.FC<TContentModalProps> = (props) => {
  
  return (
    <>
      {props.appState.currentModalContent.title && (
        <Typography variant="h5" component="h2">
          {props.appState.currentModalContent.title}
        </Typography>
      )}
      <Typography variant="body1" >
        <ReactQuill
          readOnly
          theme="bubble"
          value={
            props.appState.currentModalContent.contnet
          }
        />
      </Typography>
    </>
  );
}

const ContentModal = () => {
  const props = useContentModalProps()

  return <ContentModalPresenter {...props}/>
}

export default ContentModal;