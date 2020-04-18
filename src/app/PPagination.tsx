import React from 'react'
import { Store } from "../modules/Store";
import { MainHome } from "../modules/wpParamsReducer";
import {
    Home,
    Label,
    Person,
} from "@material-ui/icons";
import { ThemeType } from '../modules/ThemeContext';
import { useStylesFactory } from '../modules/useStylesFactory';
import { Grid } from '@material-ui/core';

import { Prev } from './PPaginationModules/Prev';
import { Latest } from './PPaginationModules/Latest';
import { DisplayNumbers } from './PPaginationModules/DisplayNumbers';
import { Oldest } from './PPaginationModules/Oldest';
import { Next } from './PPaginationModules/Next';


const styles = {
    icon: {
        fontSize: (themes: ThemeType) => themes.iconSmall
    },
    nums: {
        fontSize: (themes: ThemeType) => themes.iconSmall * 0.7,
        border: "none",
        backgroundColor: "transparent",
        margin: "auto 10px"
    },
    numsCurrent: {
        fontWeight: 'bold'
    },
    disable: {
        color: "whitesmoke"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        width: 400
    }
};

export type pageArrowProps = {
  setParams: (type: any) => void;
  classesDisable?: string;
  classesIcon?: string
};

export const PPagination = () => {
    const classes = useStylesFactory(styles)
    const { wpParams, dispatchWpParams, dispatchAppState, totalPages } = React.useContext(
      Store
    );

    const currentPage = wpParams.currentPage;
    const openModal = (modalName: string) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName })
    }

    // wpParamsReducerのWpParamsActionで上手く行かなった。検討の余地あり
    const setParams = (arg: MainHome) => {
        dispatchAppState({ type: "START_LOADING" });
        dispatchWpParams(arg);
    };
    
    const props = {
        classes,
        currentPage,
        openModal,
        setParams,
        totalPages,
    };
    type Props = typeof props


    const PPaginationPresenter = ({
        classes,
        currentPage,
        openModal,
        setParams,
        totalPages,
    }: Props) => { 
        const HomeButton = () => {
            const arg = { type: "MAINHOME" } as const
            return (
                <Home onClick={() => setParams(arg)} className={classes.icon} />
            );
        };
        const Tag = () => (
            <Label onClick={() => openModal("tag")} className={classes.icon} />
        );
        const Author = () => (
            <Person
                onClick={() => openModal("author")}
                className={classes.icon}
            />
        );

        const PageNumber = () => {
            return (
                <p className={classes.nums}>
                    【 {currentPage}/{totalPages} 】
                </p>
            );
        };

        const SelectParams = () => (
            <>
                <Grid item>
                    <HomeButton />
                </Grid>
            </>
        );

        const Pagination = () => (
            <Grid item className={classes.pagination}>
                <Latest
                    setParams={setParams}
                    classesDisable={classes.disable}
                    classesIcon={classes.icon}
                />
                <Prev
                    setParams={setParams}
                    classesDisable={classes.disable}
                    classesIcon={classes.icon}
                />
                <DisplayNumbers setParams={setParams} />
                <Next
                    setParams={setParams}
                    classesDisable={classes.disable}
                    classesIcon={classes.icon}
                />
                <Oldest
                    setParams={setParams}
                    classesDisable={classes.disable}
                    classesIcon={classes.icon}
                />
            </Grid>
        );

        return (
            <Grid container justify="center" spacing={1}>
                <SelectParams />
                <PageNumber />
                <Pagination />
            </Grid>
        );
    };



    return PPaginationPresenter(props);
}