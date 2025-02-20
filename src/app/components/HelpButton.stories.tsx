import React from 'react';
import { HelpButton } from './HelpButton';
import { makeStyles, createStyles } from '@material-ui/core';
export default {
  title: 'viewComponents/buttons/HelpButton',
  component: HelpButton,
};
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    },
    button: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
    },
  })
);
export const Normal = () => {
  return (
    <>
      <p>tesuto</p>
      <p>tesuto</p>
      <p>tesuto</p>
      <p>tesuto</p>
      <p>tesuto</p>
      <p>tesuto</p>
      <p>tesuto</p>
      <HelpButton content="中身の文章" />
    </>
  );
};
export const Center = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HelpButton content={'中央に配置できたかな？'} />
    </div>
  );
};
