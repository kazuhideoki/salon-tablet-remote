import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import {
    ImportContactsTwoTone,
    SignalWifi3BarTwoTone,
    PersonAddTwoTone,
    SettingsApplicationsTwoTone,
} from "@material-ui/icons";
import { Store } from "../Store/Store";
import { IconAndText } from "./IconAndText";
import { useStylesFactory } from "../Store/useStylesFactory";
import { PPagination } from './Pagination/PPagination';


const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    },
};

export const PFooter = () => {
    const classes = useStylesFactory(styles);
    const { appState,dispatchAppState } = useContext(Store);
  // modalNameをもとにPModalで分岐してどのモーダルウィンドウを表示させるか決める
    const openModal = (modalName: string) =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        classes,
        openModal,
        dispatchAppState,
    };
    type Props = typeof props;

    const PFooterPresenter = ({ classes, openModal, dispatchAppState }: Props) => {
        return (
            <div className={classes.root}>
                <PPagination/>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <IconAndText
                            icon={ImportContactsTwoTone}
                            onClick={() => openModal("magazines")}
                            fontSize="large"
                            text={'雑誌'}
                        />
                    </Grid>
                    <Grid item>
                        <IconAndText
                            icon={SignalWifi3BarTwoTone}
                            onClick={() => openModal("wifi")}
                            text="Wifi"
                        />
                    </Grid>
                    <Grid item>
                        <a href="https://karte.smart-recept.jp/staff/login/">
                            <IconAndText
                                icon={PersonAddTwoTone}
                                text={'登録'}
                            />
                        </a>
                    </Grid>
                    <Grid item>
                        {/* <IconAndText
                            icon={SettingsApplicationsTwoTone}
                            onClick={() => dispatchAppState({type: 'TOGGLE_IS_SETTING'})}
                            text="setting"
                        /> */}
                    </Grid>
                </Grid>
              
            </div>
        );
    };

    return PFooterPresenter(props);
};
