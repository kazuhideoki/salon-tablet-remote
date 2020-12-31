import * as types from "./types";
import { TInfoBar, TInfoBarData } from "../Types";

export const set = (infoBar: TInfoBarData) => ({
         type: types.SET,
         payload: infoBar,
       });

export type TInfoBarAction = ReturnType<typeof set>;
