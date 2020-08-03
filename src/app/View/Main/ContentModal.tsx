import React from 'react'
import { Store } from '../../Store/Store'
import { makeStyles, createStyles, Typography } from '@material-ui/core'
import ReactQuill, { Quill }from "react-quill";

const useContentModalProps = () => {
  const { appState } = React.useContext(Store)
  const article = appState.currentModalContent.article

  return {
    article,
  };
}

export type TContentModalProps = ReturnType<typeof useContentModalProps>

const useStyles = makeStyles((theme) =>
  createStyles({

  })
)

export const ContentModalPresenter: React.FC<TContentModalProps> = (props) => {
  
  return (
    <>
      {props.article.title && (
        <Typography variant="h5" component="h2">
          {props.article.title}
        </Typography>
      )}
      <Typography variant="body1" >
        <ReactQuill
          readOnly
          theme="bubble"
          value={
            props.article.article_content
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