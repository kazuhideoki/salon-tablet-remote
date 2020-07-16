import React from 'react'
import { Typography, IconButton, withStyles, makeStyles, createStyles, Theme, SvgIconTypeMap } from '@material-ui/core'
import { ThemeContext } from '../../Store/ThemeContext'
import { Store } from '../../Store/Store'
import { Autorenew } from '@material-ui/icons'
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

const StyledIconButton = withStyles({
  root: {
    // もともと定義されているcolorではなくopacityで設定。aタグのカラーを残すことができる
    color: 'inherit',
    opacity: 0.75,
    borderRadius: "15%",
  },
  label: {
    // アイコンと文字を縦に並べて整形する
    display: "flex",
    flexDirection: "column",
  },
})(IconButton)

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
    const {dispatchAppState} = React.useContext(Store)

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
          <Typography variant="body2" className={classes.titleText}>{props.text}</Typography>
        </StyledIconButton>
    );
}


