import React from 'react';
import {
  Typography,
  IconButton,
  withStyles,
  makeStyles,
  createStyles,
  Theme,
  SvgIconTypeMap,
  createMuiTheme,
  useTheme,
} from '@material-ui/core';
import { ThemeContext } from '../../../../../stores/theme/ThemeProvider';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    icon: {
      fontSize: themes.icon,
      marginTop: 0,
    },
    skeleton: {
      width: themes.icon,
      height: themes.icon,
    },
    img: {
      height: themes.icon,
    },
    titleText: {
      maxWidth: themes.icon * 2,
    },
  });
});

type Props = {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>;
  loading: boolean;
  text?: string;
  onClick?: () => void;

  img?: any;
  className?: string;
};

export const IconAndText: React.FC<Props> = (props) => {
  const classes = useStyles();

  const theme = useTheme();

  const StyledIconButton = withStyles({
    root: {
      color: theme.palette.primary.main,
      opacity: 1,
      borderRadius: theme.spacing(3),
      fontStyle: 'none',
    },
    label: {
      // アイコンと文字を縦に並べて整形する
      display: 'flex',
      flexDirection: 'column',
    },
  })(IconButton);

  // theme読み込んで withStyleでつくる

  let icon;
  // svgのアイコンはiconに入れる
  if (props.icon) {
    icon = <props.icon className={classes.icon} />;
    // 画像はurlをimgに入れる。
  } else if (props.img) {
    icon = (
      <img
        src={props.img}
        alt=""
        className={`${classes.img} ${props.className}`}
      />
    );
  }

  if (props.loading) {
    return (
      <StyledIconButton className={props.className}>
        <Skeleton
          variant="circle"
          component="div"
          className={`${classes.icon} ${classes.skeleton}`}
        />
        <Typography variant="body1" className={classes.titleText}>
          <Skeleton width={50} />
        </Typography>
      </StyledIconButton>
    );
  }

  return (
    <StyledIconButton className={props.className} onClick={props.onClick}>
      {icon}
      <Typography variant="body1" className={classes.titleText}>
        {props.text}
      </Typography>
    </StyledIconButton>
  );
};
