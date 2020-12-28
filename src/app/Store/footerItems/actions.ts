import * as types from "./types";
import { FooterItems } from "../Types";

export const set = (footeritems: FooterItems) => ({
         type: types.SET,
         payload: footeritems,
       });

export type TFooterItemsAction = ReturnType<typeof set>;
