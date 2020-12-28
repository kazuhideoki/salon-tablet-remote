import * as types from "./types";
import { TInstagramAccounts } from "../Types";

export const set = (instagramAccounts: TInstagramAccounts) => ({
         type: types.SET,
         payload: instagramAccounts,
       });

export type TInstagramAccountsAction = ReturnType<typeof set>;
