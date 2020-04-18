import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import {
    ImportContactsTwoTone,
    SignalWifi3BarTwoTone,
    PersonAddTwoTone,
    SettingsApplicationsTwoTone,
} from "@material-ui/icons";
import { ThemeContext, ThemeType } from "./Store/ThemeContext";
import { Store } from "./Store/Store";
import { PPagination } from "./PPagination/PPagination";
import { IconAndText } from "./molecules/IconAndText";
import { useStylesFactory } from "./Store/useStylesFactory";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
    },
};

export const PFooter = () => {
    const themes = React.useContext(ThemeContext);
    const classes = useStylesFactory(styles);
    const { dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeLang = () => {
        dispatchAppState({ type: "START_LOADING" });
        dispatchWpParams({ type: "LANG" });
    };
    const openModal = (modalName: string) =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        classes,
        themes,
        changeLang,
        openModal,
        dispatchAppState,
    };
    type Props = typeof props;

    const PFooterPresenter = ({ classes, themes, changeLang, openModal, dispatchAppState }: Props) => {
        return (
            <div className={classes.root}>
                <PPagination />
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
                        <IconAndText
                            icon={SettingsApplicationsTwoTone}
                            onClick={() => dispatchAppState({type: 'TOGGLE_IS_SETTING'})}
                            text="Setting"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };

    return PFooterPresenter(props);
};
