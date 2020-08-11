import React from 'react'
import { Typography, IconButton, withStyles, makeStyles, createStyles, Theme, SvgIconTypeMap, createMuiTheme, useTheme } from '@material-ui/core'
import { ThemeContext } from '../../Store/ThemeContext'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    icon: {
      fontSize: themes.icon,
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
    // svgのアイコンはiconに入れる
    if (props.icon) {
        icon = (
          <props.icon
            onClick={props.onClick ? () => handleOnClick() : null}
            // onClick={() => onClick()}
            className={classes.icon}
          />
        );
    // 画像はurlをimgに入れる。
    }else if(props.img) {
        icon = (
          <img
            src={props.img}
            alt=""
            onClick={props.onClick ? () => handleOnClick() : null}
            // onClick={() => onClick()}
            className={`${classes.img} ${props.className}`}
          />
        );
    }

    return (
        <StyledIconButton className={props.className}>
          {icon}
          <Typography variant="body1" className={classes.titleText}>{props.text}</Typography>
        </StyledIconButton>
    );
}


