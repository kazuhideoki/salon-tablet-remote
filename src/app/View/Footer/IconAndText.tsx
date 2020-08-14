import React from 'react'
import { Typography, IconButton, withStyles, makeStyles, createStyles, Theme, SvgIconTypeMap, createMuiTheme, useTheme } from '@material-ui/core'
import { ThemeContext } from '../../Store/ThemeContext'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { Skeleton } from '@material-ui/lab'
import { Height } from '@material-ui/icons'

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
})

// 表示させるアイコンはprops.icon→Material-uiのicon、もしくはprops.img→imgのsrcで切り替えることが出来る。
type Props = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
  loading: boolean,
  text?: string,
  onClick?: () => void

  img?: any
  className?: string
}

export const IconAndText:React.FC<Props> = (props) => {
    const classes = useStyles()

    const theme = useTheme()

    const StyledIconButton = withStyles({
      root: {
        color: theme.palette.primary.main,
        opacity: 1,
        borderRadius: theme.spacing(3),
        fontStyle: "none",
      },
      label: {
        // アイコンと文字を縦に並べて整形する
        display: "flex",
        flexDirection: "column",
      },
    })(IconButton);

    // theme読み込んで withStyleでつくる

    const handleOnClick = () => props.onClick();

    let icon 
    let onClick
    // svgのアイコンはiconに入れる
    if (props.icon) {
      onClick = props.onClick ? () => handleOnClick() : null
      icon = (
        <props.icon
          // onClick={() => onClick()}
          className={classes.icon}
        />
      );
    // 画像はurlをimgに入れる。
    }else if(props.img) {
      onClick = props.onClick ? () => handleOnClick() : null
      icon = (
        <img
          src={props.img}
          alt=""
          // onClick={() => onClick()}
          className={`${classes.img} ${props.className}`}
        />
      );
    }

    if (props.loading) {
      return (
        <StyledIconButton className={props.className}>
          <Skeleton variant="circle" component='div' className={`${classes.icon} ${classes.skeleton}`} />
          <Typography variant="body1" className={classes.titleText}>
            <Skeleton width={50}/>
          </Typography>
        </StyledIconButton>
      );
    }

    return (
        <StyledIconButton className={props.className} onClick={onClick}>
          {icon}
          <Typography variant="body1" className={classes.titleText}>{props.text}</Typography>
        </StyledIconButton>
    );
}


