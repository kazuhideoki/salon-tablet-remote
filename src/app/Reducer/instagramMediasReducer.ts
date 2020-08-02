import { reducerLogger } from "./reducerLogger";
import { TInstagramMedias } from "../Store/Types";

export type InstagramMediasAction = {
  type: "GET_INSTAGRAM_MEDIAS";
  payload: TInstagramMedias;
};

export function instagramMediasReducer(
  state: TInstagramMedias,
  action: InstagramMediasAction
) {
  let newState: TInstagramMedias;
  const func = instagramMediasReducer;
  switch (action.type) {
    case "GET_INSTAGRAM_MEDIAS":
      newState = action.payload;
      break;

    default:
      console.log("エラーだよ,instagramMediasReducerfd");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
