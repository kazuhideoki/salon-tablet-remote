import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { PModal } from "./PModal/PModal";
import { PMain } from "./PMain";
import { PFooter } from "./PFooter";
import { Store } from "./Store/Store";
import { ThemeContext, ThemeType } from "./Store/ThemeContext";
import { useStylesFactory } from "./Store/useStylesFactory";


// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定
const styles = {
    // vh,vwでデバイスの向きに対応することができる。
    root: {
        overflow: "hidden",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        padding: (themes: ThemeType) => `${themes.app.padding}vh ${themes.app.padding}vw`,
    },
    gridRoot: {
        height: '100%'
    },
    header: {
        marginBottom: (themes: ThemeType) => themes.pHeader.marginBottom + 'vh',
        width: (themes: ThemeType) => themes.pHeader.width + 'vw',
        height: (themes: ThemeType) => themes.pHeader.height + 'vh',
    },
    main: {
        width: (themes: ThemeType) => themes.pMain.width + 'vw',
        height: (themes: ThemeType) => themes.pMain.height + 'vh',
    },
    footer: {
        marginTop: (themes: ThemeType) => themes.pFooter.marginTop + 'vh',
        width: (themes: ThemeType) => themes.pFooter.width + 'vw',
        height: (themes: ThemeType) => themes.pFooter.height + 'vh',
    }
}

export type SetArticles = (data: any) => void
export type SetArticlesImportant = (data: any) => void
export type SetArticlesImportantEn = (data: any) => void
export type SetArticlesImportantJa = (data: any) => void
export type SetTags = (data: any) => void
export type SetUsers = (data: any) => void

type Props = {
    classes: Record<string, string>
    isLoading: boolean
}

export const App = ()=> {
    const classes = useStylesFactory(styles)

    const { wpParams, dispatchWpData, appState, dispatchAppState, setTotalPages } = React.useContext(Store);
    const isLoading = appState.isLoading
    const endLoading = () => dispatchAppState({type: "END_LOADING"})
    const setArticles = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES", payload: data });

    const setArticlesImportantEn = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_EN", payload: data });
    const setArticlesImportantJa = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_JA", payload: data });
    const setTags = (data: any) =>
        dispatchWpData({ type: "SET_TAGS", payload: data });
    const setUsers = (data: any) =>
        dispatchWpData({ type: "SET_USERS", payload: data });

    const props = {
    classes,
    isLoading,
    };
    type Props = typeof props



    const AppPresenter = ({ classes, isLoading }: Props) => {
        return (
            <div className={classes.root}>
                <Grid
                    spacing={0}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.gridRoot}
                >
                    {/* <Grid item className={classes.header}>
                    <PHeader />
                </Grid> */}
                    <Grid item className={classes.main}>
                        {!isLoading ? <PMain /> : <Skeleton />}
                    </Grid>
                    <Grid item className={classes.footer}>
                        <PFooter />
                    </Grid>
                    {/* <PArticleModal /> */}
                    <PModal />
                </Grid>
            </div>
        );
    };



    return AppPresenter(props)
}

