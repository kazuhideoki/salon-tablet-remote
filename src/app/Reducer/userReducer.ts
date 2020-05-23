import { TUser } from "../Store/Store";
import { reducerLogger } from "./reducerLogger";

export type TUserAction =
  | { type: "SET_USER_DATA", payload: TUser }


export function userReducer(state: TUser, action: TUserAction) {
  let newState: TUser;
  const func = userReducer;
  switch (action.type) {
    case "SET_USER_DATA":
      newState = action.payload
      break;

    default:
      console.log("エラーだよ,userReducerだよ");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
