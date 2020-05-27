import React from 'react'
import { Typography, IconButton, withStyles, makeStyles, createStyles, Theme } from '@material-ui/core'
import { ThemeType, ThemeContext } from '../../Store/ThemeContext'
import { Store } from '../../Store/Store'
import { Autorenew } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      // maxWidth: themes.icon * 1.2,
    },
    icon: {
      fontSize: themes.icon,
    },
    img: {
      height: themes.icon,
    },
    iconName: {
      maxWidth: themes.icon * 2,
    },
  });
})

const StyledIconButton = withStyles({
  root: {
    // もともと定義されているcolorではなくopacityで設定。aタグのカラーを残すことができる
    color: 'inherit',
    opacity: 0.75
  },
  label: {
    // アイコンと文字を縦に並べて整形する
    display: "flex",
    flexDirection: "column",
  },
})(IconButton)

// 表示させるアイコンはprops.icon→Material-uiのicon、もしくはprops.img→imgのsrcで切り替えることが出来る。
type Props = {

}

export const IconAndText = (props:any) => {
    const classes = useStyles()
    const {dispatchAppState} = React.useContext(Store)

    // onClickをonCloseの渡し方で挙動を変える
    // モーダルウィンドウが多段階になっている場合用。調整の必要ありか。
    let handleOnClick: () => void
    // 両方渡したら閉じて開く
    if (props.onClose && props.onClick) {
        handleOnClick = () => {
          dispatchAppState({ type: "CLOSE_MODAL" });
          props.onClick();
        }; 
    } else if(props.onClick) {
        handleOnClick = () => props.onClick();
    } else if(props.onClose) {
        handleOnClick = () => dispatchAppState({ type: "CLOSE_MODAL" });
    }

    let icon 
    // svgのアイコンはiconに入れる
    if (props.icon) {
        icon = (
          <props.icon
            onClick={props.onClick ? () => handleOnClick() : null}
            // onClick={() => onClick()}
            className={classes.icon}
            {...props}
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
        <StyledIconButton className={classes.root}>
          {icon}
          <Typography variant="body2" className={classes.iconName}>{props.text}</Typography>
        </StyledIconButton>
    );
}


