import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import {
    ImportContactsTwoTone,
    SignalWifi3BarTwoTone,
    PersonAddTwoTone,
    SettingsApplicationsTwoTone,
} from "@material-ui/icons";
import { ThemeContext } from "../modules/ThemeContext";
import { Store } from "../modules/Store";
import { ThemeType } from "../modules/ThemeContext";
import { pfooter } from "../modules/words";
import { PPagination } from "./PPagination";
import { useStylesFactory } from "../modules/useStylesFactory";
import { IconAndText } from "./molecules/IconAndText";
import { useWordsChange } from "../modules/useWordsChange";

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
    const { wpParams, dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeLang = () => {
        dispatchAppState({ type: "START_LOADING" });
        dispatchWpParams({ type: "LANG" });
    };
    const openModal = (modalName: string) =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });
    const w = useWordsChange(pfooter);

    const props = {
        w,
        classes,
        themes,
        changeLang,
        openModal,
        dispatchAppState,
    };
    type Props = typeof props;

    const PFooterPresenter = ({ w, classes, themes, changeLang, openModal, dispatchAppState }: Props) => {
        return (
            <div className={classes.root}>
                <PPagination />
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <IconAndText
                            icon={ImportContactsTwoTone}
                            onClick={() => openModal("magazines")}
                            fontSize="large"
                            text={w.magazines}
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
                                text={w.registration}
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
