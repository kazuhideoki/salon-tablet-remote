import React from 'react';
import { makeStyles, createStyles, Typography } from '@material-ui/core';
import ReactQuill from 'react-quill';
import {
  ContentModalPresenterProps,
  useContentModalProps,
} from './useContentModalProps';

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
  })
);

export const ContentModalPresenter: React.FC<ContentModalPresenterProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <div>
      {props.article.title && (
        <Typography variant="h5" component="h2" className={classes.header}>
          {props.article.title}
        </Typography>
      )}
      <ReactQuill
        readOnly
        theme="bubble"
        value={props.article.article_content}
      />
    </div>
  );
};

const ContentModal = () => {
  const props = useContentModalProps();
  return <ContentModalPresenter {...props} />;
};

export default ContentModal;
