import React from 'react'
import { Typography } from '@material-ui/core'
import { useStylesFactory } from '../../Store/useStylesFactory'
import { ThemeType } from '../../Store/ThemeContext'
import { Store } from '../../Store/Store'

const styles = {
    root : {
        textAlign: "center",
    },
    icon: {
        fontSize: (themes: ThemeType) => themes.icon,
    },
    img: {
        height: (themes: ThemeType) => themes.icon,
    }
} 

// 表示させるアイコンはprops.icon→Material-uiのicon、もしくはprops.img→imgのsrcで切り替えることが出来る。
type Props = {

}

export const IconAndText = (props:any) => {
    const classes = useStylesFactory(styles)
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
        <div className={classes.root}>
            {icon}
            <Typography variant="body2">
                {props.text}
            </Typography>
        </div>
    )
}


