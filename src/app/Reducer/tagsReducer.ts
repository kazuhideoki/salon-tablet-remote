import { reducerLogger } from "./reducerLogger";
import { TTags } from "../Store/Types";

export type TagsAction = {type: "GET_TAGS", payload: TTags}


export function tagsReducer(state: TTags, action: TagsAction) {
  let newState: TTags;
  const func = tagsReducer;
  switch (action.type) {
    case "GET_TAGS":
      newState = action.payload;
      break;

    default:
      console.log("エラーだよ,tagsReducer");
      newState = { ...state };
  }
  reducerLogger({ state, newState, func, action });
  return newState;
}
