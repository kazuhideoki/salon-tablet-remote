import React from "react";
import { ThemeContext } from "./ThemeContext";
import { makeStyles } from "@material-ui/core";

// useStylesFactoryでthemeContextから受け取った値をもとに、styleに定義したコンポーネントごとのスタイルを反映させたclassNameを出力
export function useStylesFactory(styles: any) {
    const useStyles = makeStyles(styles)
    const themes = React.useContext(ThemeContext);
    const classes = useStyles(themes);
    return classes
}