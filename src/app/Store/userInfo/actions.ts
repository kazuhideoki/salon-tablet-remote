import * as types from "./types";
import { TUserInfo } from "../Types";

export const set = (userInfo: TUserInfo) => ({
         type: types.SET,
         payload: userInfo,
       });

export type TUserInfoAction = ReturnType<typeof set>;
