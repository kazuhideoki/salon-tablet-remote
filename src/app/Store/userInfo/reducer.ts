import { reducerLogger } from "../../Reducer/reducerLogger";
import { TUserInfo } from "../Types";
import { TUserInfoAction } from "./actions";
import * as types from "./types";

export type UserInfoContextState = TUserInfo;

export const userInfoReducer = (
  state: UserInfoContextState,
  action: TUserInfoAction
) => {
  let newState: UserInfoContextState;
  const func = userInfoReducer;
  switch (action.type) {
    case types.SET:
      newState = action.payload
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
