import { Button, createStyles, makeStyles, Typography, Theme, TextField, Paper, useTheme, Box, Chip } from '@material-ui/core';
import React from 'react';
import { ThemeProvider, StorybookStore } from "./lib/ThemeProvider";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import "../../public/fonts/fonts.css";
import { switchingTransition } from '../app/View/Modal/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBox: {
      display: 'flex',
    },
    color: {
      width: 300,
      height: 100,
    },
    colorPrimary: {
      backgroundColor: theme.palette.primary.main,
    },
    colorSecondary: {
      backgroundColor: theme.palette.secondary.main,
    },
    colorSpan: {
      backgroundColor: 'white',
      margin: theme.spacing(1),
    },
    root: {
      padding: theme.spacing(2)
    },
    itemBox: {
      marginBottom: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    chip: {
      marginRight: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
)

const DesignBoard:React.FC = () => {
  const classes = useStyles() 

  const { selected_theme } = React.useContext(StorybookStore)
  const theme = useTheme()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = switchingTransition(selected_theme)

  return (
    <div className={classes.root}>
      <div className={`${classes.itemBox} ${classes.colorBox}`}>
        <div className={`${classes.color} ${classes.colorPrimary}`}>
          <span className={classes.colorSpan}>
            プライマリーカラー
          </span>
        </div>
        <div className={`${classes.color} ${classes.colorSecondary}`}>
          <span className={classes.colorSpan}>
            セカンダリカラー
          </span>
        </div>
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■ボタン
        </Typography> */}
        <Button className={classes.button}>デフォルト</Button>
        <Button className={classes.button} variant='contained' color='primary'>contained</Button>
        <Button className={classes.button} variant='outlined'>outlined</Button>
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■テキストフィールド
        </Typography> */}
        <TextField/>
      </div>
      <div className={classes.itemBox}>
        <Chip className={classes.chip} label='通常ラベル' />
        <Chip className={classes.chip} label='選択時ラベル' color='primary' />
        <Chip className={classes.chip} label='未選択ラベル' disabled />
      </div>
      <div className={classes.itemBox}>
        {/* <Typography component="h2" variant='h5' gutterBottom>
          ■タイポグラフィ
        </Typography> */}
        <Paper className={classes.paper}>
        <Typography component="h1" variant='h4' gutterBottom>
          見出し1 Heading 1
        </Typography>
        <Typography component="h2" variant='h5' gutterBottom>
          見出し2 Heading 3
        </Typography>
        <Typography component="p" variant='body1' gutterBottom>
          本文 Paragraph
        </Typography>
        <Typography component="p" variant='subtitle1' gutterBottom>
          サブ subtitle
        </Typography>
        <Typography component="p" variant='caption' gutterBottom>
          キャプション caption
        </Typography>
        </Paper>
      </div>
      <div className={classes.itemBox}>
      </div>
      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  )
}

export default {
  title: '_DesignBoard',
  component: DesignBoard,
  decorators: [story => <ThemeProvider >{story()}</ThemeProvider>],
};

export const Normal = () => {

  return (
    <DesignBoard/>
  )
}
